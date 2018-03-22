import { Component } from "react"
import PropTypes from "prop-types"
import { addNotification, removeNotification } from "./ducks"
import store from "store"

export default class Notif extends Component {

  showNotif() {

    if (this.uid) return

    const notifAction = addNotification({
      message : String(this.props.children),
      autoDismiss : false,
      ...this.props,
      onRemove : () => {

        this.uid = null
        if (this.props.onRemove) this.props.onRemove()

      }
    })

    this.uid = notifAction.uid

    store.dispatch(notifAction)

  }

  hideNotif() {

    if (this.uid) {

      store.dispatch(removeNotification(this.uid))
      this.uid = null

    }

  }


  componentDidMount() {

    this.showNotif()

  }

  componentWillUnmount() {

    this.hideNotif()

  }

  componentDidUpdate() {

    this.showNotif()

  }

  render() {

    return null

  }

}

Notif.propTypes = {
  title : PropTypes.string,
  message : PropTypes.string,
  level : PropTypes.oneOf(["success", "error", "warning", "info"]),
  position : PropTypes.oneOf(["tr", "tl", "tc", "br", "bl", "bc"]),
  autoDismiss : PropTypes.number,
  dismissible : PropTypes.bool,
  action : PropTypes.object,
  children : PropTypes.string,
  onAdd : PropTypes.func,
  onRemove : PropTypes.func
}

Notif.defaultProps = { level : "success" }
