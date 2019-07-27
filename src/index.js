const init = require('./init')
const { mapRoutes, mapNav } = require('./mappings')

let pgs = null
const pages = async endpoint => {
  if (!pgs) pgs = await init(endpoint)
  return pgs
}

const genRoutes = async (endpoint, layouts) => {
  const pgs = await pages(endpoint)
  const rts = await mapRoutes(pgs, layouts)
  return rts
}

const genNav = async endpoint => {
  const pgs = await pages(endpoint)
  const nv = await mapNav(pgs)
  return nv
}

module.exports = { genRoutes, genNav }
