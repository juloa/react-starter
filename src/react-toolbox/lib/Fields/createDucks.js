import apis from "react-starter/src/restAPI"
import { fromJS } from "immutable"
import { logout } from "react-starter/src/restAPI/Auth/ducks"
import { injectReducers } from "react-starter/src/store"

export default (field) => {

  const STATE_PROPERTY = "fields/" + field

  const FETCH_REQUEST = STATE_PROPERTY + "/FETCH_REQUEST"
  const FETCH_SUCCESS = STATE_PROPERTY + "/FETCH_SUCCESS"
  const FETCH_ERROR = STATE_PROPERTY + "/FETCH_ERROR"

  const api = apis[field]

  const fetchAll = (params = {}) => dispatch => {

    dispatch({ type : FETCH_REQUEST })

    return api.find({ ...params, limit : 10000 })
      .then(res => dispatch({ type : FETCH_SUCCESS, list : res.results }))
      .catch(e => {
        if (e.status === 403) dispatch(logout())
        dispatch({ type : FETCH_ERROR, error : e.message })
      })

  }

  const fetchAllIfNeeded = (params = {}) => (dispatch, getState) => {

    const list = getState()[STATE_PROPERTY].get("list").toJS()

    if (!list.length) return dispatch(fetchAll(params))

    return null

  }

  const initialState = fromJS({
    isFetching : false,
    fetchError : null,
    list : []
  })

  function reducer(state = initialState, action) {

    switch (action.type) {

    case FETCH_REQUEST :
      return state.merge({ isFetching : true, fetchError : null, list : fromJS([]) })

    case FETCH_SUCCESS :
      return state.merge({ isFetching : false, fetchError : null, list : fromJS(action.list) })

    case FETCH_ERROR :
      return state.merge({ isFetching : false, fetchError : action.error })

    default : return state

    }

  }

  injectReducers({ [STATE_PROPERTY] : reducer })

  return { STATE_PROPERTY, fetchAll, fetchAllIfNeeded, reducer }

}
