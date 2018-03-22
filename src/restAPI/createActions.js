import { logout } from "./Auth/ducks"
import { fromJS } from "immutable"
import { injectReducers } from "store"

export default function createActions(STATE_PROPERTY, api) {

  const FETCH_REQUEST = STATE_PROPERTY + "/FETCH_REQUEST"
  const FETCH_SUCCESS = STATE_PROPERTY + "/FETCH_SUCCESS"
  const FETCH_ERROR = STATE_PROPERTY + "/FETCH_ERROR"
  const RESET = STATE_PROPERTY + "/RESET"

  const createAction = (method) => {

    return args => dispatch => {

      dispatch({ type : FETCH_REQUEST })

      return api[method](args)
        .then(res => {

          const action = { type : FETCH_SUCCESS }

          if (method !== "delete") action.item = res

          dispatch(action)

          return res

        })
        .catch(e => {

          if (e.status === 403) dispatch(logout())

          if (!e.detail) {
            if (e.non_field_errors) {
              if (Array.isArray(e.non_field_errors)) {
                e.detail = e.non_field_errors[0]
              } else {
                e.detail = e.non_field_errors
              }
            } else {
              e.detail = ""
            }
          }

          dispatch({ type : FETCH_ERROR, error : e.detail })

          e._error = e.detail // redux-form

          throw e

        })
    }
  }

  const initialState = fromJS({
    item : {},
    isFetching : false,
    fetchError : null
  })

  function reducer(state = initialState, action) {

    switch (action.type) {

    case RESET :

      return fromJS({
        item : {},
        isFetching : false,
        fetchError : null
      })

    case FETCH_REQUEST :

      return state
        .merge({
          isFetching : true,
          fetchError : null
        })

    case FETCH_SUCCESS :

      return state
        .merge({
          isFetching : false,
          fetchError : null,
          item : fromJS(action.item)
        })

    case FETCH_ERROR :

      return state
        .merge({
          isFetching : false,
          fetchError : action.error
        })

    default :

      return state

    }

  }

  injectReducers({ [STATE_PROPERTY] : reducer })

  return {
    getItem : createAction("get"),
    createItem : createAction("create"),
    deleteItem : createAction("delete"),
    updateItem : createAction("update"),
    resetItem : () => ({ type : RESET }),
    FETCH_REQUEST,
    FETCH_SUCCESS,
    FETCH_ERROR,
    RESET
  }

}
