/* eslint no-unused-expressions:0 max-statements:0*/
import Mocker from "./"

let baseUrl = location.protocol + "//" + location.host

describe("Mocker", () => {

  const mocker = new Mocker(baseUrl)

  mocker.log = false

  mocker.requestDelay = 50

  it("should add routes", () => {

    mocker.get("", () => "toto")
    mocker.post("", () => {})
    mocker.put("", () => {})
    mocker.delete("", () => {})

    expect(mocker.routes.GET[baseUrl]).to.be.a("function")
    expect(mocker.routes.POST[baseUrl]).to.be.a("function")
    expect(mocker.routes.PUT[baseUrl]).to.be.a("function")
    expect(mocker.routes.DELETE[baseUrl]).to.be.a("function")

  })

  baseUrl = "http://toto.fr:8080/"

  mocker.baseUrl = baseUrl

  it("should change routes", () => {

    expect(mocker.routes.GET[baseUrl]).to.be.a("function")
    expect(mocker.routes.POST[baseUrl]).to.be.a("function")
    expect(mocker.routes.PUT[baseUrl]).to.be.a("function")
    expect(mocker.routes.DELETE[baseUrl]).to.be.a("function")

  })

  it("should register routes with default arguments", done => {

    mocker.register({ handler : () => "hello" })
    mocker.register({ path : "/:id", handler : req => req.params.id })

    mocker.fetch(baseUrl)
    .then(res => res.text())
    .then(text => expect(text).to.equal("hello"))
    .then(() => mocker.fetch(baseUrl + "/458"))
    .then(res => res.text())
    .then(text => {
      expect(text).to.equal("458")
      done()
    })
    .catch(() => {
      expect(false).to.be.true
      done()
    })

  })

  it("should return handlers", () => {

    const handlers = mocker._getHandlers("get")

    expect(handlers).to.have.property(mocker.baseUrl)

  })

  it("should return route", () => {

    const route = mocker._getRoute("get", mocker.baseUrl)

    expect(route).to.be.a("string")

  })

  it("should add routes with params", () => {

    mocker.get("/:type/:id/", () => {})
    mocker.post("/:type/:id", () => {})
    mocker.put("/:type/:id", () => {})
    mocker.delete("/:type/:id", () => {})

    expect(mocker.routes.GET[mocker.baseUrl + "/:type/:id/"]).to.be.a("function")
    expect(mocker.routes.POST[mocker.baseUrl + "/:type/:id"]).to.be.a("function")
    expect(mocker.routes.PUT[mocker.baseUrl + "/:type/:id"]).to.be.a("function")
    expect(mocker.routes.DELETE[mocker.baseUrl + "/:type/:id"]).to.be.a("function")

  })

  it("should wait for 10ms", done => {

    mocker
    .wait(20)
    .then(done)
    .catch(e => {
      console.log(e)
      done()
    })

  })

  it("should simulate a fetch request", done => {

    const delay = new Promise(resolve => setTimeout(resolve, 50))

    const url = "http://metrodev2/toto"

    mocker.get(url, () => "toto")

    mocker.fetch(url)
    .then(delay)
    .then(() => {
      expect(true).to.be.true
      done()
    })
    .catch(() => {
      expect(false).to.be.true
      done()
    })

  })

  baseUrl = location.protocol + "//" + location.host

  mocker.baseUrl = baseUrl

  it("should be able to use parameters for responses", done => {

    mocker.get("/:id", request => "the id is " + request.params.id)

    mocker
    .fetch("/3")
    .then(res => res.text())
    .then(text => {
      expect(text).to.equal("the id is 3")
      done()
    })
    .catch(() => {
      expect(false).to.be.true
      done()
    })

  })

  it("should be able to use query parameters for responses", done => {

    mocker.get("/:id", request => "the param is " + request.query.param)

    mocker
    .fetch("/3?param=ww")
    .then(res => res.text())
    .then(text => {
      expect(text).to.equal("the param is ww")
      done()
    })
    .catch(() => {
      expect(false).to.be.true
      done()
    })

  })

  it("should return status", () => {

    mocker.get("/:id", request => {

      const id = request.params.id

      if (id > 10) {

        return new Response("id should be <= 10", { status : 400 })

      } else return "ok"

    })

    mocker.fetch(baseUrl + "/9")
    .then(res => expect(res.status).to.equal(200))

    mocker.fetch(baseUrl + "/15")
    .then(res => expect(res.status).to.equal(400))

  })

})
