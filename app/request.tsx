const { protocol, host } = location

const bearer = () => localStorage.getItem('bearer')

export default (method: string, conf?: RequestInit) => {
  const { headers, ...config } = conf

  const opts = Object.assign({
    method: conf.body ? 'POST' : 'GET',
    headers: {
      Authorization: `Bearer ${bearer()}`,
      'Content-Type': conf.body ? 'application/json' : null,
      ...headers
    }
  }, config)

  return fetch(`${protocol}//api.${host}/${method}`, opts).then((res) => {
    if (!res.ok) return res.text().then((value) => Promise.reject(value))

    const type = res.headers.get('content-type')
    const json = type.includes('application/json')

    return Promise.resolve(json ? res.json() : res)
  })
}
