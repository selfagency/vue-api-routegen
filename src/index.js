const init = require('./init')
const { mapRoutes, mapNav } = require('./mappings')

let pgs = null
const pages = async endpoint => {
  if (!pgs) pgs = await init(endpoint)
  return pgs
}

const routes = async (endpoint, layouts) => {
  const pgs = await pages(endpoint)
  const rts = await mapRoutes(pgs, layouts)
  return rts
}

const nav = async endpoint => {
  const pgs = await pages(endpoint)
  const nv = await mapNav(pgs)
  return nv
}

module.exports = { routes, nav }

if (require.main === module) {
  ;(async () => {
    const endpoint = 'http://127.0.0.1:1337/pages'
    // const rts = routes(endpoint, {})
    // const nv = await nav(endpoint)
    console.log(rts)
    return false
  })()
}
