import { fromJS } from "immutable"

export const STATE_PROPERTY = "notifications"

const ADD = STATE_PROPERTY + "/ADD_NOTIFICATION"
const REMOVE = STATE_PROPERTY + "/REMOVE_NOTIFICATION"

const initialState = fromJS({})

export const reducer = (state = initialState, action) => {

  switch (action.type) {

  case ADD :

    return state.merge({ [action.uid] : action.props })

  case REMOVE :

    return state.delete(String(action.index))

  default :

    return state

  }

}

let uid = 0

export function addNotification(properties) {

  uid++

  return {
    type : ADD,
    props : { uid, ...properties },
    uid
  }

}

export function addFailureNotif(message, options) {

  return addNotification({
    message,
    level : "error",
    position : "tr",
    autoDismiss : 10,
    dismissible : true,
    ...options
  })
}

export function addSuccessNotif(message, options) {

  return addNotification({
    message,
    level : "success",
    position : "tr",
    autoDismiss : 3,
    dismissible : true,
    ...options
  })

}

export function removeNotification(index) {

  return {
    type : REMOVE,
    index
  }

}
