import RestClient from "react-starter/src/restAPI/RestClient"
import createActions from "react-starter/src/restAPI/createActions"
import createMock from "react-starter/src/restAPI/createMock"
import Chance from "chance"

const chance = new Chance()

const list = []

for (let i = 0; i < 100; i++) {
  list.push({
    id : chance.guid(),
    name : chance.first()
  })
}

const mock = createMock(list)


class API extends RestClient {

  constructor(baseUrl = "/public/api/metro/core/dev/crud") {

    super(baseUrl)

    this.mocker.register(mock)

  }

}

const api = new API()

api.mocker.requestDelay = 700

if (process.env.NODE_ENV !== "production") api.mocker.enable()

const STATE_PROPERTY = "dev/crud"

module.exports = {
  STATE_PROPERTY,
  api,
  ...createActions(STATE_PROPERTY, api)
}
