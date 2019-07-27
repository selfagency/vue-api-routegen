const init = require('../src/init')
const endpoint = 'http://localhost:1337/pages'

test('expect array', async () => {
  expect(await init(endpoint)).toBeArray()
})
