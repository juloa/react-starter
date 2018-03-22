import RestClient from "../RestClient"
import mock from "./mock"

export default class AuthApi extends RestClient {

  constructor(url = "/public/api/metro/user/tokens/") {

    super(url)

    this.mocker.register(mock)
    this.mocker.enabled = true
  }

  set pathname(pathname) {

    super.pathname = pathname
    this.loginPath = this.pathname
  }

}

