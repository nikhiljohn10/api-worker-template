const App = require('./api/app')
const Routes = require('./api/routes')

// Set base path as /api/v1 => example.com/api/v1 
const app = new App('/api/v1') 
Routes.load(app)

async function handleRequest(request) {
    return await app.render(request)
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})
