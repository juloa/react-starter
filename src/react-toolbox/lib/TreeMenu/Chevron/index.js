import React from "react"
import PropTypes from "prop-types"

const styles = {
  chevron : {
    width : 15,
    textAlign : "center",
    fontSize : 8
  },
  open : {
    transition : "transform 0.3s",
    transform : "rotate(90deg)"
  },
  closed : {
    transition : "transform 0.3s",
    transform : "rotate(0deg)"
  }
}

export default function Chevron({ collapsed }) {

  return <span style={ { ...styles.chevron, ...(collapsed ? styles.closed : styles.open) } }>▶</span>

}

Chevron.propTypes = { collapsed : PropTypes.bool }
