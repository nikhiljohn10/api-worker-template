const App = require('./router')

/**
 * Example of how router can be used in an application
 *  */
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

function handler(req, res) {
    return res.json({ some: 'json' })
}

async function handleRequest(request) {
    const app = new App()
    // Replace with the approriate paths and handlers
    app.get('.*/bar', () => new Response('responding for /bar'))
    app.get('.*/foo', (req, res) => handler(req, res))
    app.post('.*/foo.*', (req, res) => res.json({ some: 'more json' }))
    app.get('/demos/router/foo', (req, res) => res.fetch(req)) // return the response from the origin

    app.get('/', () => new Response('Hello worker!')) // return a default message for the root route

    const resp = await app.route(request)
    return resp
}
