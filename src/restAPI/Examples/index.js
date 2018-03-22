import RestClient from "../RestClient"
import mock from "./mock"

export default class ExamplesAPI extends RestClient {

  constructor(baseUrl = "/public/api/metro/core/examples") {

    super(baseUrl)

    this.mocker.register(mock)

  }

}
