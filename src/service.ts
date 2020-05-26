import * as Koa from 'koa'
import { Op, cast, col, where, and } from 'sequelize'
import Validator from 'validator'
import { readFileSync } from 'fs'
import { createTransport } from 'nodemailer'
import { createHmac, randomBytes, Hmac } from 'crypto'
import { User, Room, RoomOccupation, RoomRequest, UserInfo } from './models'


const { MAIL_SECRET, AUTH_SECRET, DOMAIN } = process.env

const { isEmail, isMobilePhone } = Validator

const confirmTemplate = readFileSync('./public/templates/email-confirmation.html', { encoding: 'utf-8' })
const reqRespTemplate = readFileSync('./public/templates/email-request-response.html', { encoding: 'utf-8' })
const recoveryTemplate = readFileSync('./public/templates/email-recovery.html', { encoding: 'utf-8' })

type TSignupPayload = {
  email: string;
  password: [string, string];
  firstname: string;
  lastname: string;
  phone: number;
  dob: number;
}

type TWebToken = {
  id: string;
  rank: number;
  lastname: string;
  firstname: string;
  dob: Date;
  phone: number;
  profileIcon: string | null;
  signed: number;
}

const sendConfirm = (to: string, confirm: string) => {
  const html = confirmTemplate.replace(/{link}/g, `https://${DOMAIN}/signup?confirm=${confirm}`)
  return createTransport(MAIL_SECRET).sendMail({ to, html, subject: 'Potwierdzenie rejestracji', from: 'Confirm Indorm <confirm@indorm.life>' })
}

const sendReqRes = (to: string, firstname: string, accepted: boolean) => {
  const html = reqRespTemplate.replace(/{firstname}/, firstname).replace(/{action}/, accepted ? 'accepted' : 'denied')
  return createTransport(MAIL_SECRET).sendMail({ to, html, subject: 'Room request', from: 'Administration <admin@indorm.life>' })
}

const sendRecovery = (to: string, firstname: string, token: string) => {
  const html = recoveryTemplate.replace(/{firstname}/, firstname).replace(/{link}/g, `https://${DOMAIN}/recover?recovery=${token}`)
  return createTransport(MAIL_SECRET).sendMail({ to, html, subject: 'Password Recovery', from: 'Recover Indorm <recover@indorm.life>' })
}

const isValidPassword = (password: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~!@#$%^&*()\-=_+;:'"/?,<.>])(?=.{6,})/.test(password)

const validateSignup = async (payload: TSignupPayload) => {
  const { email, password, firstname, lastname, phone, dob } = payload

  if (![email, password, firstname, lastname, phone, dob].every((v) => v)) return new Error('Bad Request')

  if (!isEmail(email)) return new Error('Email is invalid')
  if (!Array.isArray(password) || password[0] !== password[1]) return new Error('Passwords do not match')
  if (!isValidPassword(password[0])) return new Error('Password is too weak')
  if (!isMobilePhone(`+48${phone}`, 'pl-PL', { strictMode: true })) return new Error('Phone number is invalid')
  if (!+new Date(dob) || +new Date(dob) < -220899384e4 || +new Date() - +new Date(dob) < 504576e6) return new Error('Invalid age')

  const user = await User.findOne({ where: { email } })
  if (user) return new Error('User already exists')

  return new Error()
}

const hashObject = (obj: TWebToken) => Object.values(obj).reduce((a: Hmac, c) => a.update(`${c}`), createHmac('sha256', AUTH_SECRET || '')).digest('base64')
const hashPayload = <T>(obj: T) => Object.values(obj).reduce((a: Hmac, c) => a.update(`${c}`), createHmac('sha256', AUTH_SECRET || '')).digest('base64')

const sign = (payload: TWebToken) => {
  const hash = hashObject(payload)
  const json = JSON.stringify({ ...payload, hash })

  return Buffer.from(json).toString('base64')
}

const sign2 = (payload: { [key: string]: any }) => {
  const signed = Date.now()
  const hash = hashPayload({ ...payload, signed })
  const json = JSON.stringify({ ...payload, signed, hash })

  return Buffer.from(json).toString('base64')
}

const verify2 = async (token: string) => {
  const string = Buffer.from(token, 'base64').toString()
  const { hash, ...payload } = JSON.parse(string) as { [key: string]: any }
  const hmac = hashPayload(payload)

  return hash === hmac
    ? Promise.resolve(payload)
    : Promise.reject(new Error('Hashes do not match'))
}

const verify = async (bearer: string) => {
  const string = Buffer.from(bearer, 'base64').toString()
  const { hash, ...payload }: { hash: string } & TWebToken = JSON.parse(string)
  const hmac = hashObject(payload)

  return hash === hmac
    ? Promise.resolve(payload)
    : Promise.reject(new Error('Hashes do not match'))
}

export const authorize: Koa.Middleware = (ctx, next) => {
  const { authorization }: { authorization: string } = ctx.header
  if (!authorization) return ctx.throw(400)

  const [, bearer] = authorization.split(' ')

  return verify(bearer || '').then((data: TWebToken) => {
    if (Date.now() - data.signed > 6e8) return ctx.throw(408)
    return Object.assign(ctx.state, data) && next()
  }).catch(() => ctx.throw(401))
}

export const isAdmin: Koa.Middleware<TWebToken> = (ctx, next) => {
  const { rank } = ctx.state

  return rank > 0 ? ctx.throw(403) : next()
}

export const isManager: Koa.Middleware<TWebToken> = (ctx, next) => {
  const { rank } = ctx.state

  return rank > 1 ? ctx.throw(403) : next()
}

export const onSignup: Koa.Middleware = async (ctx) => {
  const payload = ctx.request.body as TSignupPayload
  const { email, password, firstname, lastname, phone, dob } = payload

  const { message } = await validateSignup(payload)
  if (message) return ctx.throw(400, message)

  const hmac = createHmac('sha256', AUTH_SECRET || '').update(password[0]).digest('base64')
  const confirmation = randomBytes(48).toString('base64').replace(/\+/g, '-').replace(/\//g, '_')

  const user = await User.create({ email, hmac, confirmation })
  user.createUserInfo({ firstname, lastname, phone, dob: new Date(dob) })

  await sendConfirm(email, confirmation)

  ctx.status = 200
}

export const onConfirm: Koa.Middleware = async (ctx) => {
  const { confirmation } = ctx.request.body as { confirmation: string }
  if (!confirmation) return ctx.throw(400)

  const user = await User.findOne({ where: { confirmation } })
  if (!user) return ctx.throw(404)

  await user.update({ confirmation: null })

  ctx.status = 200
}

export const onLogin: Koa.Middleware = async (ctx) => {
  const { email, password } = ctx.request.body as { email: string; password: string }

  if (!(email && password)) return ctx.throw(400)
  const hmac = createHmac('sha256', AUTH_SECRET || '').update(password).digest('base64')

  const user = await User.findOne({ where: { email, hmac, confirmation: null } })
  if (!user) return ctx.throw(401)

  const info = await user.getUserInfo()
  const bearer = sign({ signed: Date.now(), ...info.toJSON() } as TWebToken)

  ctx.body = { bearer }
}

export const onPostRecover: Koa.Middleware<TWebToken> = async (ctx) => {
  const { email } = ctx.request.body

  if (!email || typeof email !== 'string') return ctx.throw(400)

  const user = await User.findOne({ where: { email, confirmation: null } })

  ctx.status = 200

  if (!user) return

  const { firstname } = await user.getUserInfo()

  const payload = { id: user.id, prev: user.hmac.slice(0, 8) }
  const token = encodeURIComponent(sign2(payload))

  sendRecovery(email, firstname, token)
}

export const onGetRecover: Koa.Middleware<TWebToken> = async (ctx) => {
  const { token } = ctx.params as { token: string }

  return verify2(token).then(async ({ id, prev, signed }) => {
    if (Date.now() - signed > 864e5) return ctx.throw(408)

    const user = await User.findByPk(id)

    if (!user) return ctx.throw(404)
    if (user.hmac.slice(0, 8) !== prev) return ctx.throw(408, 'Token already used')

    ctx.status = 200
  }).catch(() => ctx.throw(404))
}

export const onPutRecover: Koa.Middleware<TWebToken> = async (ctx) => {
  const { token, pass, pass2 } = ctx.request.body as { token: string, pass: string, pass2: string }

  return verify2(token).then(async ({ id, prev, signed }) => {
    if (Date.now() - signed > 864e5) return ctx.throw(408)

    const user = await User.findByPk(id)

    if (!user) return ctx.throw(404)
    if (user.hmac.slice(0, 8) !== prev) return ctx.throw(408, 'Token already used')

    if (typeof pass !== 'string' || typeof pass2 !== 'string') return ctx.throw(400)
    if (pass !== pass2) return ctx.throw(400, `Passwords don't match`)

    const hmac = createHmac('sha256', AUTH_SECRET || '').update(pass).digest('base64')

    await user.update({ hmac })

    ctx.status = 200
  }).catch(() => ctx.throw(404))
}

export const onGetUserRes: Koa.Middleware<TWebToken> = async (ctx) => {
  const { id } = ctx.state

  const occ = await RoomOccupation.findOne({ where: { uid: id }, attributes: { exclude: ['id'] } })
  if (!occ) {
    const req = await RoomRequest.findOne({ where: { uid: id } })
    return (ctx.body = { error: req ? 2 : 1 })
  }

  ctx.body = occ.toJSON()
}

export const onGetRooms: Koa.Middleware<TWebToken> = async (ctx) => {
  const floor = +ctx.params.floor
  const { gt, lt } = Op

  if (!floor) return ctx.throw(400)

  const rawRooms = await Room.findAll({ where: { id: { [gt]: floor * 100, [lt]: (floor + 1) * 100 } }, include: [RoomOccupation] })

  const rooms = rawRooms.map(({ id, max, available, RoomOccupations }) => ({ id, current: RoomOccupations?.length, max, available }))

  ctx.body = { rooms }
}

export const onPostRoomReq: Koa.Middleware<TWebToken> = async (ctx) => {
  const { id } = ctx.state
  const { rid, expire } = ctx.request.body as { rid: number, expire: number }

  if (!rid || !expire) return ctx.throw(400)

  if (expire < Date.now()) return ctx.throw(400, 'Date is in the past')

  const room = await Room.findOne({ where: { id: rid } })
  if (!room) return ctx.throw(404, 'Room not found')

  const num = await RoomOccupation.count({ where: { rid } })
  if (num >= room.max) return ctx.throw(400, 'Room is full')

  const req = await RoomRequest.findOne({ where: { uid: id } })
  if (req) return ctx.throw(400, 'Request already exists')

  await RoomRequest.create({ rid, expire: new Date(expire), uid: id }).catch(console.error)

  ctx.status = 200
}

export const onGetRoomReq: Koa.Middleware<TWebToken> = async (ctx) => {
  const requests = await RoomRequest.findAll({ include: [UserInfo] })

  ctx.body = { requests }
}

export const onPutRoomReq: Koa.Middleware<TWebToken> = async (ctx) => {
  const { id, accept } = ctx.request.body as { id: string, accept: boolean }

  if (!id || accept === undefined) return ctx.throw(400)

  const req = await RoomRequest.findByPk(id, { include: [User, UserInfo] })
  if (!req || !req.User || !req.UserInfo) return ctx.throw(404)

  const { User: { email }, UserInfo: { firstname }, uid, rid, expire } = req

  if (accept) {
    RoomOccupation.create({ uid, rid, expire })
    sendReqRes(email, firstname, true)
  } else sendReqRes(email, firstname, false)

  req.destroy()

  ctx.body = 200
}

export const onPostResidents: Koa.Middleware<TWebToken> = async (ctx) => {
  const { iLike } = Op
  const { room, firstname, lastname } = ctx.request.body as { room: string, firstname: string, lastname: string }

  if ((typeof room !== 'string') || (room && !/^\d{1,3}$/.test(room))) return ctx.throw(400, 'Incorrect room number')
  if (firstname && !/^[a-zA-Z ]+$/.test(firstname)) return ctx.throw(400, 'Incorrect firstname')
  if (lastname && !/^[a-zA-Z ]+$/.test(lastname)) return ctx.throw(400, 'Incorrect lastname')

  const rid = { [iLike]: room.length === 1 ? `${room}%` : room.length === 2 ? `%${room}` : room.length === 3 ? room : '%' }

  const residents = await RoomOccupation.findAll({
    where: and(
      where(cast(col('rid'), 'text'), rid),
      where(col('firstname'), { [iLike]: firstname ? `${firstname.trim()}%` : '%' }),
      where(col('lastname'), { [iLike]: lastname ? `${lastname.trim()}%` : '%' })),
    include: [UserInfo],
    limit: 28
  }).catch(console.error)

  ctx.body = { residents }
}
