const App = require('./api/app')
const routes = require('./api/routes')

async function handleRequest(request) {
    const app = new App('/api/v1')
    routes.load(app)
    return await app.render(request)
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})