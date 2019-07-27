# Welcome to vue-api-routegen 👋

![Version](https://img.shields.io/npm/v/vue-api-routegen.svg)
[![Twitter: selfagency_llc](https://img.shields.io/twitter/follow/selfagency_llc.svg?style=social)](https://twitter.com/selfagency_llc)

> An opinionated utility for automatically generating Vue.js routes and navigation from your API. This is a work in progress and not yet ready for public consumption.

### 🏠 [Homepage](https://gitlab.com/selfagency/vue-api-routegen)

## Install

```sh
npm install vue-api-routegen
```

## Usage

In your API, configure your content type/collection to have the following parameters:

- `title [string]`: the page title
- `slug [string]`: the URL in snake-case format
- `published [boolean]`: whether the content should be publicly displayed
- `redirect [string]`: a URL to redirect the page to, if so desired
- `hidden [boolean]`: whether the content should be shown in the site navigation
- `layout [string]`: the name of the Vue component to use for the content
- `order [integer]`: the order in which to show the content in the navigation
- `parent [relational many-to-one]`: the page parent

### Routes

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
import { genNav } from 'vue-api-routegen'
import VueComponentA from './components/your-component-A.vue'
import VueComponentB from './components/your-component-B.vue'
import VueComponentC from './components/your-component-C.vue'

const endpoint = 'https://your.api/path-to-collection'

const components = {
  componentA: VueComponentA,
  componentB: VueComponentB,
  componentC: VueComponentC
}

const routes = await genRoutes(endpoint, components)

const router = new VueRouter({
  routes
})

const app = new Vue({
  router
}).$mount('#app')
```

### Nav

#### Nav.js

```javascript
import Vue from 'vue'
const nav = Vue.component('Nav', {
  template: `
    <template>
      <nav>
        <ul>
          <li v-for="(navItem, index) in navItems" :key="index">
            <router-link v-if="!navItem.redirect" :to="{ name: navItem.name }" exact>
              {{ navItem.title }}
            </router-link>
            <a v-if="navItem.redirect" :href="navItem.redirect" exact>
              {{ navItem.title }}
            </a>
            <ul v-if="navItem.children.length > 0">
              <li v-for="(subnavItem, subIndex) in navItem.children" :key="subIndex">
                <router-link v-if="!subnavItem.redirect"
                  :to="{ name: subnavItem.name }" exact>
                  {{ subnavItem.title }}
                </router-link>
              </li>
              <a v-if="subnavItem.redirect" :href="subnavItem.redirect" exact>
                {{ navItem.title }}
              </a>
            <//ul>
          </li>
        </ul>
      </nav>
    </template>
  `,
  props: {
    navItems: {
      default() {
        return []
      },
      type: Array
    }
  }
})
```

#### NavBar.js

```javascript
import Vue from 'vue'
import { genNav } from 'vue-api-routegen'
import Nav from './components/Nav.js'

const endpoint = 'https://your.api/path-to-collection'
const navItems = await genNav(endpoint)

const navBar = Vue.component('NavBar', {
  components: {
    Nav
  },
  template: `
    <template>
      <div id="navbar">
        <Nav :navItems="navItems"></Nav>
      </div>
    </template>
  `,
  data: function() {
    return {
      navItems
    }
  }
})
```

## Author

👤 **Daniel Sieradski**

- Twitter: [@selfagency_llc](https://twitter.com/selfagency_llc)
- Gitlab: [@selfagency](https://gitlab.com/selfagency)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://gitlab.com/selfagency/vue-api-routegen/issues).

## Show your support

Give a ⭐️ if this project helped you!
