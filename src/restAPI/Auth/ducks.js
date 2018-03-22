import { fromJS } from "immutable"
import AuthApi from "./"

export const STATE_PROPERTY = "login"

const LOGIN_REQUEST = STATE_PROPERTY + "/LOGIN_REQUEST"
const LOGIN_ERROR = STATE_PROPERTY + "/LOGIN_ERROR"
const LOGIN_SUCCESS = STATE_PROPERTY + "/LOGIN_SUCCESS"
const LOGOUT = STATE_PROPERTY + "/LOGOUT"

export const api = new AuthApi()

const initialState = fromJS({
  username : api.username || "",
  token : api.token || "",
  isFetching : false,
  fetchError : null,
  remember : api.remember
})


export function reducer(state = initialState, action) {

  switch (action.type) {

  case LOGIN_REQUEST :

    return state.merge({ isFetching : true, fetchError : null, token : null })

  case LOGIN_SUCCESS :

    return state.merge({
      isFetching : false,
      fetchError : null,
      token : action.token,
      username : action.username
    })

  case LOGIN_ERROR :
    return state.merge({ isFetching : false, fetchError : action.error })

  case LOGOUT :

    return state.merge({
      token : null,
      username : ""
    })

  default :
    return state

  }

}

export const recoverLogin = () => dispatch => {

  const token = api.getToken()

  if (token) {

    dispatch({
      type : LOGIN_SUCCESS,
      username : api.username,
      token : api.token
    })

    // on le fait en deux temps pour ne pas afficher la page de login pour rien
    api.checkToken(token).catch(() => dispatch(logout()))

  } else dispatch(logout())

}


export const login = (username, password, remember) => dispatch => {

  dispatch({ type : LOGIN_REQUEST })

  api.remember = remember

  return api.login(username, password)
    .then(token => {

      dispatch({
        type : LOGIN_SUCCESS,
        username,
        token
      })

    })
    .catch(error => dispatch({ type : LOGIN_ERROR, error : error.message }))

}


export const logout = () => dispatch => {

  api.logout()

  return Promise.resolve(dispatch({ type : LOGOUT }))

}
