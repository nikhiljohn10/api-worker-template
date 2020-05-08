const render = require('./controllers')

module.exports = {
  load: (app) => {

  	// This route will match https://example.com/api/v1/users/nikhiljohn10 => { userId: "nikhiljohn10"}
    app.get('/users/:userId', (req, res) => render.user(res))

  	// This route will match https://example.com/api/v1/bar => responding for /bar
    app.get('.*/bar', () => new Response('responding for /bar'))

  	// This route will match https://example.com/api/v1/foo => { some: 'Have some foo' }
    app.get('/foo', (req, res) => render.foo(res))

  	// This route will match only the post request of https://example.com/api/v1/foo => { some: 'more json' }
    app.post('.*/foo.*', (req, res) => res.json({ some: 'more json' }))

  	// This is the root of the route path and it will match https://example.com/api/v1/ => Hello worker!
    app.get('/', (req, res) => res.html('<h3>Hello worker!</h3>'))
  }
}