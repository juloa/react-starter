/* eslint camelcase:0 */
/* eslint no-useless-escape:0*/
import PureMocker from "react-starter/src/react-toolbox/lib/fetch-mocker"
import Chance from "chance"

const chance = new Chance()

class Mocker extends PureMocker {

  enable() {
    this.enabled = true
  }

  disable() {
    this.enabled = false
  }

}


export default class RestClient {

  constructor(url) {

    this.mocker = new Mocker(this.baseUrl)

    this.baseUrl = url

    this.headers = {}

    this._initLogin()
  }

  _initLogin() {

    this.loginPath = "/public/api/metro/user/tokens/"
    this.token = null
    this.username = null
    this._remember = false
    this._storageName = "user"
  }

  get loginUrl() {

    return this.protocol + "//" + this.hostname + (this.port ? ":" + this.port : "") + this.loginPath
  }

  get baseUrl() {

    const { protocol, hostname } = this
    let { port, pathname } = this

    port = (port && ":" + port) || ""

    pathname = pathname ? pathname + (pathname.slice(-1) === "/" ? "" : "/") : ""

    return protocol + "//" + hostname + port + pathname
  }

  set baseUrl(url) {

    const { hostname, protocol, port } = window.location

    const parseUrlReg = /(?:(https?:|ftp:)\/\/([\w-\.]+)(?::([0-9]{1,4}))?)?(\/.*?)?$/

    const matches = (url && parseUrlReg.exec(url)) || []

    this.protocol = matches[1] || protocol
    this.hostname = matches[2] || hostname
    this.port = matches[2] ? (matches[3] || "") : (matches[3] || port)

    this.pathname = matches[4] || "/"

    this.mocker.baseUrl = this.baseUrl
  }

  get protocol() {
    return this._protocol
  }

  set protocol(protocol) {
    this._protocol = protocol
    this.mocker.baseUrl = this.baseUrl
  }

  get hostname() {
    return this._hostname
  }

  set hostname(hostname) {
    this._hostname = hostname
    this.mocker.baseUrl = this.baseUrl
  }

  get port() {
    return this._port
  }

  set port(port) {
    this._port = port
    this.mocker.baseUrl = this.baseUrl
  }

  get pathname() {
    return this._pathname
  }

  set pathname(pathname) {
    this._pathname = pathname
    this.mocker.baseUrl = this.baseUrl
  }

  _makeUrl(id) {

    return this.baseUrl + id + "/"
  }

  create(data = {}) {

    const opt = {
      method : "POST",
      body : JSON.stringify(data)
    }

    return this.fetchJSON(this.baseUrl, opt)

  }

  delete(id) {

    return this.fetchJSON(this._makeUrl(id), { method : "DELETE" })

  }

  get(id) {

    return this.fetchJSON(this._makeUrl(id), { method : "GET" })

  }

  find(query = {}) {

    const fetchUrl = new URL(this.baseUrl)

    if (typeof query === "string") return this.find({ search : query })

    for (const key in query) fetchUrl.searchParams.append(key, query[key])

    return this.fetchJSON(fetchUrl, { method : "GET" })

  }

  update(data) {

    return this.fetchJSON(this._makeUrl(data.id || data.uuid), { method : "PUT", body : JSON.stringify(data) })

  }

  patch(data) {

    return this.fetchJSON(this._makeUrl(data.id || data.uuid), { method : "PATCH", body : JSON.stringify(data) })
  }

  options() {

    return this.fetchJSON(this.baseUrl, { method : "OPTIONS" })

  }

  checkToken(token) {

    if (!token) return Promise.reject(new Error("token is falsy"))

    let promise

    if (this.mocker.enabled) {
      console.log(">>>>>")
      promise = Promise.resolve({ is_superuser : true, user_id : 1 })
    } else {
      promise = fetch(this.loginUrl + token)
        .then(this._processResponse)
        .catch(this._processError)
    }

    return promise.then(() => token)

  }

  login(username, password) {

    const token = this.getToken()

    if (token && this.username === username) return this.checkToken(token)

    this.logout()

    const opt = { method : "POST", body : JSON.stringify({ username, password }) }

    let promise

    console.log(this.mocker)

    if (this.mocker.enabled) {
      promise = Promise.resolve({ token : chance.guid() })
    } else {
      promise = fetch(this.loginUrl, opt)
        .then(this._processResponse)
        .catch(this._processError)
    }

    return promise.then(res => {

      this.token = res.token
      this.username = username
      this.storeToken()

      return this.token
    })
  }

  get storage() {
    const storage = window[(this.remember ? "local" : "session") + "Storage"]

    console.log(this.remember ? "local" : "session")

    return storage
  }

  get remember() {
    return this._remember
  }

  set remember(bool) {

    this.removeStorage()
    this._remember = Boolean(bool)

    console.log(bool)

    if (this.username && this.token) this.storeToken()
  }

  storeToken() {

    const { username, token } = this

    console.log()

    this.storage.setItem(this._storageName, JSON.stringify({ username, token }))

  }

  getToken() {

    let json = localStorage.getItem(this._storageName)

    if (!json) json = sessionStorage.getItem(this._storageName)

    if (!json) return null

    const fields = JSON.parse(json)

    this.username = fields.username
    this.token = fields.token

    return this.token
  }

  removeStorage() {
    console.log("Pas bien ")

    return [localStorage, sessionStorage].forEach(store => store.removeItem(this._storageName))
  }

  logout() {

    this.token = null
    this.username = null
    this.removeStorage()
  }

  get logged() {

    if (!this.token) this.getToken()

    return Boolean(this.token)
  }

  _processResponse(response) {

    if (response.headers.get("Content-Type") === null) return null
    else if (response.ok) return response.json()
    else {

      let error = {
        status : response.status,
        statusText : response.statusText
      }

      const contentType = response.headers.get("content-type")

      if (contentType && contentType.indexOf("application/json") !== -1) {

        return response.json()
          .then(res => {
            error = { ...error, ...res }
            throw error
          })
      } else {
        return response.text()
          .then(res => {

            const msg = { message : res }

            error = { ...error, ...msg }
            throw error
          })
      }
    }

  }

  _processError(err) {
    if (err.json) {

      return err.json()
        .then(errorObject => { throw errorObject })

    } else {
      throw err
    }

  }

  fetchJSON(url, options = null) {

    const { ...opt } = options

    if (!opt.headers) opt.headers = new Headers()

    for (const n in this.headers) {
      opt.headers.append(n, this.headers[n])
    }

    opt.headers.append("Content-Type", "application/json")

    const token = this.getToken()

    if (token) opt.headers.append("X-Synopsis-Token", token)

    console.log(this.mocker.enabled)

    const promise = this.mocker.enabled ? this.mocker.fetch(url, opt) : fetch(url, opt)

    return promise.then(this._processResponse).catch(this._processError)

  }

}
