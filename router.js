/**
 * Helper functions that when passed a request will return a
 * boolean indicating if the request uses that HTTP method,
 * header, host or referrer.
 */
const WorkerResponse = require('./response')
const Method = method => req =>
  req.method.toLowerCase() === method.toLowerCase()
const Connect = Method('connect')
const Delete = Method('delete')
const Get = Method('get')
const Head = Method('head')
const Options = Method('options')
const Patch = Method('patch')
const Post = Method('post')
const Put = Method('put')
const Trace = Method('trace')

const Header = (header, val) => req => req.headers.get(header) === val
const Host = host => Header('host', host.toLowerCase())
const Referrer = host => Header('referrer', host.toLowerCase())
const AddSlash = s => s.replace(/\/$/, "") + "/"

const LoadParams = (path, base) => req => {
  const urlPath = req.url.replace(base, "")
  var params = {}
  var ParamValues = urlPath.split("/")
  var Keys = path.split("/")
  ParamValues.reverse()
  Keys.reverse()
  for (let key in Keys) {
    const paramKey = Keys[key]
    if (paramKey.includes(":")) {
      params[paramKey.replace(':', '')] = ParamValues[key]
    }
  }
  return params
}

const Path = regExp => req => {
  const url = new URL(req.url)
  var expr = AddSlash(regExp)
  const path = AddSlash(url.pathname)
  const alphanum = new RegExp(/\:[\w\d]+/, "gi")
  const newPath = expr.replace(alphanum, alphanum.source.toString())
  if (expr != newPath) {
    expr = new RegExp(newPath.replace(/\\:/g, ''))
  }
  const match = path.match(expr) || []
  return match[0] === path
}

/**
 * The Router handles determines which handler is matched given the
 * conditions present for each request.
 */
class Router {
  constructor(base) {
    this.base = base ? base.replace(/\/$/, "") : ""
    this.routes = []
  }

  handle(conditions, handler, params) {
    this.routes.push({
      conditions,
      handler,
      params
    })
    return this
  }

  connect(url, handler) {
    return this.handle([Connect, Path(this.base + url)], handler, LoadParams(url, this.base))
  }

  delete(url, handler) {
    return this.handle([Delete, Path(this.base + url)], handler, LoadParams(url, this.base))
  }

  get(url, handler) {
    return this.handle([Get, Path(this.base + url)], handler, LoadParams(url, this.base))
  }

  head(url, handler) {
    return this.handle([Head, Path(this.base + url)], handler, LoadParams(url, this.base))
  }

  options(url, handler) {
    return this.handle([Options, Path(this.base + url)], handler, LoadParams(url, this.base))
  }

  patch(url, handler) {
    return this.handle([Patch, Path(this.base + url)], handler, LoadParams(url, this.base))
  }

  post(url, handler) {
    return this.handle([Post, Path(this.base + url)], handler, LoadParams(url, this.base))
  }

  put(url, handler) {
    return this.handle([Put, Path(this.base + url)], handler, LoadParams(url, this.base))
  }

  trace(url, handler) {
    return this.handle([Trace, Path(this.base + url)], handler, LoadParams(url, this.base))
  }

  all(handler) {
    return this.handle([], handler, LoadParams(url, this.base))
  }

  route(req) {
    const route = this.resolve(req)
    if (route) {
      const response = new WorkerResponse()
      var request = req
      request['params'] = route.params(request)
      return route.handler(request, response)
    }

    return new Response('<h1>404: Page Not Found</h1>', {
      status: 404,
      statusText: 'not found',
      headers: {
        'content-type': 'text/html',
      },
    })
  }

  /**
   * resolve returns the matching route for a request that returns
   * true for all conditions (if any).
   */
  resolve(req) {
    return this.routes.find(r => {
      if (!r.conditions || (Array.isArray(r) && !r.conditions.length)) {
        return true
      }

      if (typeof r.conditions === 'function') {
        return r.conditions(req)
      }

      return r.conditions.every(c => c(req))
    })
  }
}

module.exports = Router
