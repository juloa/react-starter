import React from "react"
import PropTypes from "prop-types"
import NotificationSystem from "react-notification-system"
import { connect } from "react-redux"
import { STATE_PROPERTY } from "./ducks"
export { reducer, STATE_PROPERTY, addNotification, addFailureNotif, addSuccessNotif, removeNotification } from "./ducks"


export class NotifSystem extends React.Component {

  componentDidUpdate(prevProps) {

    const oldNotifs = prevProps.notifs
    const notifs = this.props.notifs

    for (const n in oldNotifs) {

      if (!(n in notifs)) this.system.removeNotification(n)

    }

    for (const n in notifs) {

      if (!(n in oldNotifs)) this.system.addNotification(notifs[n])

    }

  }

  render() {

    return (
      <NotificationSystem ref={ elmt => this.system = elmt }/>
    )

  }

}

NotifSystem.propTypes = { notifs : PropTypes.object }


function mapStateToProps(state) {

  const notifs = state[STATE_PROPERTY].toJS()

  return { notifs }

}

export default connect(mapStateToProps)(NotifSystem)
