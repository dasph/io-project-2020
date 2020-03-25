import * as Koa from 'koa'
import { promisify } from 'util'
import { exec } from 'child_process'
import { IncomingMessage } from 'http'
import * as bodyPaser from 'koa-bodyparser'
import { request, RequestOptions } from 'https'

type SlackRequestOptions = RequestOptions & { hostname: 'hooks.slack.com', payload: string }
type HastebinRequestOptions = RequestOptions & { hostname: 'hastebin.com', payload: string }

const { SLACK_NOTIFIER } = process.env

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

function send (options: SlackRequestOptions): Promise<string>
function send (options: HastebinRequestOptions): Promise<{ key: string }>
function send (options: SlackRequestOptions | HastebinRequestOptions) {
  return new Promise<IncomingMessage>((resolve, reject) => {
    const { payload, ...headers } = options

    const req = request(headers, resolve).on('error', reject)
    req.write(payload)
    req.end()
  }).then((stream) => new Promise<{ json: boolean, data: string }>((resolve, reject) => {
    const json = stream.headers['content-type'] === 'application/json'
    const data: Array<Buffer> = []

    stream.on('data', (chunk) => (data.push(chunk)))
    stream.on('end', () => resolve({ json, data: String(Buffer.concat(data)) }))
    stream.on('error', reject)
  })).then(({ json, data }) => json ? JSON.parse(data) : data)
}

const upload = (log: string): Promise<string> => send(headers.hastebin(log)).then(({ key }) => key)
const notify = (text: string): Promise<string> => send(headers.slack(`{"text":"${text}"}`))

const deploy = (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>): void => {
  const { after } = JSON.parse(ctx.request.body.payload)
  const head = after.slice(0, 8)

  run('npm run deploy')
    .then(({ stderr, stdout }) => `ERRORS:\n${stderr}\nOUTPUT:\n${stdout}`)
    .then(upload).then((key) => notify(message(head, 'succeeded', key)))
    .catch((e: Error) => upload(e.message).then((key) => notify(message(head, 'failed', key))))

  ctx.body = 'OK'
}

const verify = (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>, next: Koa.Next): void => {
  next()
}

new Koa()
  .use((ctx, next) => ctx.header['x-github-event'] === 'push' ? next() : ctx.throw(400))
  .use(bodyPaser())
  .use(deploy)
  .listen(8080)
