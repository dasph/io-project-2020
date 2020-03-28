import * as Koa from './src/koa'
import { promisify } from 'util'
import { exec } from 'child_process'
import { IncomingMessage } from 'http'
import * as bodyPaser from 'koa-bodyparser'
import { request, RequestOptions } from 'https'
import { createHmac, timingSafeEqual } from 'crypto'

type SlackRequestOptions = RequestOptions & { hostname: 'hooks.slack.com', payload: string }
type HastebinRequestOptions = RequestOptions & { hostname: 'hastebin.com', payload: string }

const { WEBHOOK_SECRET, SLACK_NOTIFIER } = process.env

const run = promisify(exec)
const message = (head: string, state: string, key: string) => `> Head \`${head}\`: deployment *${state}*\n> Logs can be found <https://hastebin.com/${key}|here>`

const headers = {
  slack: (payload: string): SlackRequestOptions => ({
    method: 'POST',
    hostname: 'hooks.slack.com',
    path: `/services/${SLACK_NOTIFIER}`,
    headers: { 'Content-Type': 'application/json', 'Content-Length': payload.length },
    payload
  }),
  hastebin: (payload: string): HastebinRequestOptions => ({
    method: 'POST',
    hostname: 'hastebin.com',
    path: '/documents',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': payload.length },
    payload
  })
}

const verify = (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>, next: Koa.Next): Promise<any> => {
  const sig = ctx.header['x-hub-signature']
  const payload = JSON.stringify(ctx.request.body)
  const hmac = createHmac('sha1', WEBHOOK_SECRET || '')
  const digest = Buffer.from(`sha1=${hmac.update(payload).digest('hex')}`, 'utf8')
  const checksum = Buffer.from(sig, 'utf8')

  return (checksum.length === digest.length && timingSafeEqual(digest, checksum)) ? next() : ctx.throw(401)
}

const requestSend = (options: RequestOptions, payload?: string) => {
  return new Promise<IncomingMessage>((resolve, reject) => {
    const req = request(options, resolve).on('error', reject)
    req.write(payload)
    req.end()
  })
}

const requestDigest = (stream: IncomingMessage) => {
  return new Promise<{ json: boolean, data: string }>((resolve, reject) => {
    const json = stream.headers['content-type'] === 'application/json'
    const data: Array<Buffer> = []

    stream.on('data', (chunk) => (data.push(chunk)))
    stream.on('end', () => resolve({ json, data: String(Buffer.concat(data)) }))
    stream.on('error', reject)
  })
}

function send (options: SlackRequestOptions): Promise<string>
function send (options: HastebinRequestOptions): Promise<{ key: string }>
function send (options: SlackRequestOptions | HastebinRequestOptions) {
  const { payload, ...headers } = options

  return requestSend(headers, payload).then(requestDigest).then(({ json, data }) => json ? JSON.parse(data) : data)
}

const upload = (log: string): Promise<string> => send(headers.hastebin(log)).then(({ key }) => key)
const notify = (text: string): Promise<string> => send(headers.slack(`{"text":"${text}"}`))

const deploy = (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>): void => {
  const head = ctx.request.body.after.slice(0, 8)

  run('npm run deploy')
    .then(({ stdout }) => upload(stdout)).then((key) => notify(message(head, 'succeeded', key)))
    .catch((e: Error) => upload(e.message).then((key) => notify(message(head, 'failed', key))))

  ctx.body = 'OK'
}

new Koa()
  .use((ctx, next) => ctx.header['x-github-event'] === 'push' ? next() : ctx.throw(400))
  .use(bodyPaser())
  .use((ctx, next) => ctx.request.body.ref === 'refs/heads/master' ? next() : (ctx.status = 204))
  .use(verify)
  .use(deploy)
  .listen(8080)
