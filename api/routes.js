const render = require('./controllers')

module.exports = {
  load: (app) => {

    // This route will match https://example.com/api/v1/users/nikhiljohn10 => { userId: "nikhiljohn10"}
    app.get('/users/:userId', (req) => render.user(req))

    // This route will match https://example.com/api/v1/bar => responding for /bar
    app.get('.*/bar', (req, res) => res.json({ test:'responding for /bar'}))

    // This route will match https://example.com/api/v1/foo => { some: 'Have some foo' }
    app.get('/foo', (req) => render.foo())

    // This route will match only the post request of https://example.com/api/v1/foo => { some: 'more json' }
    app.post('.*/foo.*', (req, res) => res.json({ some: 'more json' }))

    // Load a favicon from URL mentioned as argument
    app.get('/favicon\.ico', (req) => render.faviconFromURL('https://ddnslab.tech/public/images/favicon.ico'))

    // This is the root of the route path and it will match https://example.com/api/v1/ => Hello worker!
    app.get('/', (req, res) => res.json({ 
      message: "API is running",
      author: "https://github.com/nikhiljohn10",
      template: "https://github.com/nikhiljohn10/api-worker-template",
      test_routes: {
        foo: "https://api.ddnslab.tech/foo",
        user_id: "https://api.ddnslab.tech/users/nikhiljohn10",
        favicon: "https://api.ddnslab.tech/favicon.ico"
      }
    }))
  }
}
