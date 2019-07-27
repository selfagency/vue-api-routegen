const axios = require('axios')
const casex = require('casex')
const deepcopy = require('deepcopy')
const is = require('typa')

async function init(endpoint) {
  try {
    let routes = deepcopy((await axios.get(endpoint)).data)

    routes = routes.map(route => {
      if (is.bad(route)) throw new Error('Invalid route data.')

      const meta = {
        id: route.id,
        index: route.layout === 'index',
        order: route.order,
        parent: route.parent ? route.parent.id : null,
        title: route.title
      }

      if (!route.redirect && route.published) {
        return {
          name: casex(route.title, 'caSe'),
          path: route.slug,
          hidden: route.hidden,
          component: casex(route.layout, 'CaSe'),
          props: true,
          meta
        }
      }

      if (route.redirect) {
        return {
          path: route.slug,
          redirect: route.redirect,
          meta
        }
      }
    })

    const parents = routes.filter(route => {
      return !route.meta.parent
    })

    const children = routes.filter(route => {
      return route.meta.parent
    })

    const index = route => {
      route.children.push({
        name: casex(route.name, 'caSe'),
        path: '',
        props: true,
        component: route.component
      })

      route.children.push({
        path: ':id',
        props: true,
        component: casex(route.name, 'CaSe')
      })
    }

    children.forEach(route => {
      if (route.meta.index) {
        route.children = []
        index(route)
        delete route.name
        // route.component = 'Subroute'
      }
    })

    parents.forEach(route => {
      route.path = `/${route.path}`

      route.children = children.filter(kids => {
        return kids.meta.parent === route.meta.id
      })

      if (route.children.length > 0) {
        route.children.push({
          name: casex(route.name || '', 'caSe'),
          path: '',
          props: true,
          component: route.component,
          meta: {
            order: 0
          }
        })
        delete route.name
        // route.component = 'Subroute'

        route.children.sort((a, b) => {
          return a.meta.order - b.meta.order
        })
      }

      if (route.meta.index) {
        index(route)
        delete route.name
        // route.component = 'Subroute'
      }
    })

    parents.sort((a, b) => {
      return a.meta.order - b.meta.order
    })

    parents[0].path = '/'

    // console.log(parents)
    return parents
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = init
