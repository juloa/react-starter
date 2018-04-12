import createActions from "react-starter/src/restAPI/createActions"
import apis from "react-starter/src/restAPI"

export const STATE_PROPERTY = "examples"

export const api = apis.examples

export const actions = createActions(STATE_PROPERTY, api)
