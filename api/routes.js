const render = require('./controllers')

module.exports = {
  load: (app) => {
    app.get('.*/bar', () => new Response('responding for /bar'))
    app.get('/foo', (req, res) => render.foo(res))
    app.post('.*/foo.*', (req, res) => res.json({ some: 'more json' }))
    app.get('/', (req, res) => res.html('<h3>Hello worker!</h3>'))
  }
}