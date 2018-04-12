import RestClient from "react-starter/src/restAPI/RestClient"
import mock from "./mock"

class API extends RestClient {

  constructor(baseUrl = "/public/api/metro/core/dev/crud") {

    super(baseUrl)

    this.mocker.register(mock)

  }

}

const api = new API()

api.mocker.requestDelay = 300

if (process.env.NODE_ENV !== "production") api.mocker.enable()

export default api
