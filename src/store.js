import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunkMiddleware from "redux-thunk"
import { reducer as formReducer } from "redux-form"

import {
  reducer as loginReducer,
  STATE_PROPERTY as LOGIN_PROPERTY,
  recoverLogin
} from "react-starter/src/restAPI/Auth/ducks"

let devTools

if (process.env.NODE_ENV !== "production" && window.__REDUX_DEVTOOLS_EXTENSION__) {
  devTools = window.__REDUX_DEVTOOLS_EXTENSION__()
}

const middlewares = applyMiddleware(thunkMiddleware)

let reducers = {
  form : formReducer,
  [LOGIN_PROPERTY] : loginReducer
}

const store = createStore(
  combineReducers(reducers),
  devTools ? compose(middlewares, devTools) : middlewares
)


export function injectReducers(newReducers) {

  if (typeof newReducers === "object") reducers = { ...reducers, ...newReducers }
  else throw new TypeError((typeof newReducers) + " : newReducers should be an object of reducers (functions)")

  store.replaceReducer(combineReducers(reducers))

}

store.dispatch(recoverLogin())

export default store
