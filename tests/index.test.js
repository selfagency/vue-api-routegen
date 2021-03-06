const Vue = require('vue')
const { genRoutes, genNav } = require('../src/index')

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
  const rts = await genRoutes(endpoint, layouts)
  expect(rts).toBeArray()
  console.log(rts)
})

test('nav builder', async () => {
  const nv = await genNav(endpoint)
  expect(nv).toBeArray()
})
