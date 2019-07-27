const casex = require('casex')
const deepcopy = require('deepcopy')
const is = require('typa')

const mapRoutes = async (rts, layouts) => {
  try {
    const routes = deepcopy(rts)

    return routes.map(route => {
      if (route && route.component && route.name) {
        route.components = {
          default: layouts[route.component],
          index: route.component === 'Index' ? layouts[casex(route.name, 'CaSe')] : null
        }
        delete route.component
      }

      if (route && route.children && is.arr(route.children) && route.children.length > 0) {
        route.children = route.children.map(child => {
          if (child.children && is.arr(child.children) && child.children.length > 0) {
            child.children = child.children.map(cchild => {
              let name
              if (cchild.path === ':id') {
                name = `${cchild.component || casex(cchild.name, 'CaSe')}Page`
                cchild.name = casex(name, 'caSe')
              } else {
                name = cchild.name ? casex(cchild.name, 'CaSe') : cchild.component
              }

              cchild.component = layouts[name]
              return cchild
            })
          }

          let name
          if (child.path === ':id') {
            name = `${child.component || casex(child.name, 'CaSe')}Page`
            child.name = casex(name, 'caSe')
          } else {
            name = child.name ? casex(child.name, 'CaSe') : child.component
          }

          child.components = {
            default: layouts[name],
            index: child.component === 'Index' && child.name ? layouts[casex(child.name, 'CaSe')] : null
          }
          delete child.component

          return child
        })
      }

      return route
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

/* Build navigation */
const mapNav = async rts => {
  try {
    let routes = Object.assign([], rts)
    routes = routes.splice(1, routes.length)
    return routes.map(route => {
      const temp = {
        name: route.name,
        path: route.path,
        title: route.meta.title,
        redirect: route.redirect ? route.redirect : null,
        children: []
      }

      if (route.children && is.arr(route.children) && route.children.length > 0) {
        const i = route.children.findIndex(r => {
          return r.path === ''
        })
        if (is.num(i)) temp.name = route.children[i].name

        route.children.forEach(r => {
          if (r.path !== '' && r.path !== ':id') {
            let name

            if (r.children && is.arr(r.children) && r.children.length > 0) {
              const j = r.children.findIndex(c => {
                return c.path === ''
              })
              if (is.num(j)) name = r.children[j].name
            }

            temp.children.push({
              name: name || r.name,
              path: r.path,
              title: r.meta.title
            })
          }
        })
      } else {
        route.children = []
      }

      if (route.hidden) {
        delete temp.name
        delete temp.path
      }

      return temp
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = { mapRoutes, mapNav }
