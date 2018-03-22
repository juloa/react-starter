/* eslint no-unused-expressions:0, max-nested-callbacks:0 */
import AuthApi from "./"

describe("Log API", () => {

  const authApi = new AuthApi("http://metrodev2/public/api/metro/user/tokens/")

  it("should log in", done => {

    authApi.login("admin", "admin").then(token => {

      expect(token).to.be.a("string")
      expect(authApi.logged).to.be.true

      return authApi.logout()
    })
    .then(() => {
      expect(authApi.logged).to.be.false
      done()
    })
    .catch(() => {
      expect(true).to.be.false; done()
    })

  })

  it("should simulate log in", done => {

    authApi.mocker.enable()
    authApi.mocker.log = false

    authApi.login("admin", "admin").then(token => {

      expect(token).to.be.a("string")
      expect(authApi.logged).to.be.true

      return authApi.logout()
    })
    .then(() => {

      expect(authApi.logged).to.be.false
      done()
    })
    .catch(() => { expect(true).to.be.false; done() })

  })

})
