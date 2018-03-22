/* eslint no-unused-expressions:0, max-nested-callbacks:0 */
import RestClient from "./"

describe("RestClient", () => {

  it("should parse http://metrodev2 correctly", () => {

    const api = new RestClient("http://metrodev2")

    expect(api.protocol).to.equal("http:")
    expect(api.hostname).to.equal("metrodev2")
    expect(api.port).to.equal("")
    expect(api.pathname).to.equal("/")

  })

  it("should parse http://metrodev2/ correctly", () => {

    const api = new RestClient("http://metrodev2/")

    expect(api.protocol).to.equal("http:")
    expect(api.hostname).to.equal("metrodev2")
    expect(api.port).to.equal("")
    expect(api.pathname).to.equal("/")

  })

  it("should parse https://metrodev2:8080 correctly", () => {

    const api = new RestClient("https://metrodev2:8080")

    expect(api.protocol).to.equal("https:")
    expect(api.hostname).to.equal("metrodev2")
    expect(api.port).to.equal("8080")
    expect(api.pathname).to.equal("/")

  })

  it("should parse https://metrodev2:8080/ correctly", () => {

    const api = new RestClient("https://metrodev2:8080/")

    expect(api.protocol).to.equal("https:")
    expect(api.hostname).to.equal("metrodev2")
    expect(api.port).to.equal("8080")
    expect(api.pathname).to.equal("/")

  })

  it("should parse https://metrodev2/public/api/metro/core/categories correctly", () => {

    const api = new RestClient("https://metrodev2/public/api/metro/core/categories")

    expect(api.protocol).to.equal("https:")
    expect(api.hostname).to.equal("metrodev2")
    expect(api.port).to.equal("")
    expect(api.pathname).to.equal("/public/api/metro/core/categories")

  })

  it("should parse https://metrodev2:8080/public/api/metro/core/categories/ correctly", () => {

    const api = new RestClient("https://metrodev2:8080/public/api/metro/core/categories/")

    expect(api.protocol).to.equal("https:")
    expect(api.hostname).to.equal("metrodev2")
    expect(api.port).to.equal("8080")
    expect(api.pathname).to.equal("/public/api/metro/core/categories/")

  })

  it("should parse /public/api/metro/core/categories/ correctly", () => {

    const api = new RestClient("/public/api/metro/core/categories/")

    expect(api.protocol).to.equal("http:")
    expect(api.hostname).to.equal("localhost")
    expect(api.port).to.equal("9876")
    expect(api.pathname).to.equal("/public/api/metro/core/categories/")

  })

  it("should normalize /public/api/metro/core/categories correctly", () => {

    const api = new RestClient("/public/api/metro/core/categories")

    expect(api.baseUrl).to.equal("http://localhost:9876/public/api/metro/core/categories/")

  })

})
