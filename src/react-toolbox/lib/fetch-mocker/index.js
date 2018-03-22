import pathMatch from "path-match"
import nodeUrl from "url"
import "whatwg-fetch"
import Res from "./Response"

const nativeFetch = window.fetch

export default class Mocker {

  constructor(baseUrl = "") {

    this._baseUrl = baseUrl

    this.requestDelay = 0

    this.mockAllRequests = false

    this.response404 = "Not found"

    this.log = true

    this.routes = {
      GET : {},
      POST : {},
      PUT : {},
      DELETE : {},
      PATCH : {},
      OPTIONS : {}
    }

    this.fetch = this.fetch.bind(this)

    for (const n in this.routes) this[n.toLowerCase()] = this.register.bind(this, n)

  }

  set baseUrl(baseUrl) {

    const oldUrl = this._baseUrl

    if (/^http/.test(baseUrl)) this._baseUrl = baseUrl
    else this._baseUrl = window.location.protocol + "//" + window.location.host + baseUrl

    if (oldUrl === this._baseUrl) {
      return
    }

    for (const method in this.routes) {

      const methodRoutes = this.routes[method]

      for (const oldRoute in methodRoutes) {

        const newRoute = oldRoute.replace(oldUrl, this._baseUrl)

        methodRoutes[newRoute] = methodRoutes[oldRoute]

        delete methodRoutes[oldRoute]

      }
    }

  }

  get baseUrl() {

    return this._baseUrl
  }

  _setPath(path) {

    if (!path) return this.baseUrl
    else if (/^http/.test(path)) return path
    else return this.baseUrl + path
  }

  register(method, path, handler) {

    if (Array.isArray(method)) {

      method.forEach(this.register.bind(this))

    } else if (typeof method === "object") {

      this.register(method.method, method.path, method.handler)

    } else {

      const type = (method && method.toUpperCase()) || "GET"

      const fullPath = this._setPath(path)

      this.routes[type][fullPath] = handler

    }

  }

  wait(ms) {

    return new Promise(resolve => setTimeout(resolve, ms))

  }

  _getHandlers(method) {

    return this.routes[method.toUpperCase()]

  }

  _getHandler(method, route) {

    const handlers = this._getHandlers(method)

    return handlers && handlers[route]

  }

  _getRoute(method, href) {

    const handlers = this._getHandlers(method)

    return handlers && Object.keys(handlers).find(path => pathMatch()(path)(href))

  }

  makeResponse(content, status = 200) {

    const strContent = (typeof content === "string") ? content : JSON.stringify(content)

    return new Response(strContent, { status })

  }

  _url2obj(url) {

    let strUrl

    if (typeof url === "string") strUrl = url
    else if (url instanceof URL || url.href) strUrl = url.href
    else throw new TypeError((typeof url) + " : incorrect type for url")

    return nodeUrl.parse(strUrl, true)

  }

  _getHref(url) {

    const protocol = url.protocol || window.location.protocol
    const host = url.host || window.location.host
    const pathname = (typeof url === "string") ? url : url.pathname

    return protocol + "//" + host + pathname

  }

  fetch(url, options = {}) {

    const objUrl = this._url2obj(url)
    const method = options.method || "GET"
    const href = this._getHref(objUrl)
    const route = this._getRoute(method, href)
    const handler = this._getHandler(method, route)
    const params = route && pathMatch()(route)(href)

    let result

    if (handler) {

      result = handler.call(this, {
        params,
        query : objUrl.query,
        body : options.body || "",
        headers : options.headers || {}
      }, new Res())

    } else if (this.mockAllRequests) {

      result = this.makeResponse(this.response404, 404)

    } else {

      if (this.log) console.info(method, objUrl.href, "no handler for this request")

      return nativeFetch(url, options)

    }

    return this.wait(this.requestDelay)
      .then(() => result)
      .then(res => {

        const response = (res instanceof Response) ? res : this.makeResponse(res)

        if (this.log) {

          const args = [method, objUrl.href, response.status]
          const logMethod = response.ok ? "log" : "warn"

          if (method === "POST" || method === "PUT") args.push(options.body)

          args.push(res)
          console[logMethod](...args)

        }

        return response

      })

  }

  enable() {

    window.fetch = this.fetch
    // this.enabled = true

  }

  disable() {

    window.fetch = nativeFetch
    // this.enabled = false

  }

}
