import { api as authAPI } from "restAPI/Auth/ducks"

import UserAPI from "./Users"
import ExamplesAPI from "./Examples"

const apis = {
  user : new UserAPI(),
  auth : authAPI,
  examples : new ExamplesAPI()
}

if (process.env.REACT_APP_LOCALSERVER_HOSTNAME && process.env.REACT_APP_LOCALSERVER_PORT) {
  const hostname = process.env.REACT_APP_LOCALSERVER_HOSTNAME
  const port = process.env.REACT_APP_LOCALSERVER_PORT

  Object.keys(apis).forEach(name => {

    if (name === "synopsis") return

    /* log
    if (name === "log" || name === "synopsis") {
      apis[name].hostname = "217.182.158.104"
      apis[name].port = "8080"
      apis[name]._noToken = false

      return
    }
    // log */

    apis[name].protocol = "http:"
    apis[name].hostname = hostname
    apis[name].port = port

  })
}

apis.examples.mocker.enable()
apis.auth.mocker.enable()
apis.user.mocker.enable()

export default apis
