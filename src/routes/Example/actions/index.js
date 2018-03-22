import createActions from "restAPI/createActions"
import apis from "restAPI"

export const STATE_PROPERTY = "examples"

export const api = apis.examples

export const actions = createActions(STATE_PROPERTY, api)
