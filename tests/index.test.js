const Vue = require('vue')
const { routes, nav } = require('../src/index')

const endpoint = 'http://127.0.0.1:1337/pages'

const testComponent = Vue.component('Test', {
  template: `
    <template>
      <div>
        <h1>{{ greeting }}</h1>
      </div>
    </template>
  `,
  data: function() {
    return {
      greeting: 'hello'
    }
  }
})

const layouts = {
  ActionAlerts: testComponent,
  ActionAlertsPage: testComponent,
  Calendar: testComponent,
  CalendarPage: testComponent,
  Campaigns: testComponent,
  CampaignsPage: testComponent,
  Form: testComponent,
  Home: testComponent,
  Index: testComponent,
  InTheNews: testComponent,
  LocalChapters: testComponent,
  People: testComponent,
  Statements: testComponent,
  StatementsPage: testComponent,
  Static: testComponent,
  Subroute: testComponent,
  Testimony: testComponent,
  TestimonyPage: testComponent,
  Updates: testComponent,
  UpdatesPage: testComponent
}

test('route builder', async () => {
  const sample = [
    {
      children: [],
      components: [{ default: [], index: null }],
      hidden: false,
      meta: { id: 19, index: false, order: 0, parent: null, title: 'Home' },
      name: 'home',
      path: '/',
      props: true
    }
  ]
  const rts = await routes(endpoint, layouts)
  expect(rts).toBeArray()
  console.log(rts)
})

test('nav builder', async () => {
  const nv = await nav(endpoint)
  expect(nv).toBeArray()
})
