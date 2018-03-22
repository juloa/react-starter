// eslint-disable-line import/no-extraneous-dependencies
import React from "react"
import PropTypes from "prop-types"

const styles = {

  threebounce : {
    borderRadius : "100%",
    display : "inline-block",
    animation : "spinnerBounceDelay 1.4s infinite ease-in-out",
    animationFillMode : "both"
  },

  threebounce1 : { animationDelay : "-0.32s" },
  threebounce2 : { animationDelay : "-0.16s" },
  fadein : { animation : "spinnerFadeIn 2s" }
}


const Spinner = ({ fadeIn, style, color, size, ...rest }) => {

  const itemStyle = { backgroundColor : color, width : size, height : size }

  return (
    <div { ...rest } style={ { ...style, ...(fadeIn ? styles.fadein : null) } }>
      <div style={ { ...styles.threebounce, ...styles.threebounce1, ...itemStyle } }/>
      <div style={ { ...styles.threebounce, ...styles.threebounce2, ...itemStyle } }/>
      <div style={ { ...styles.threebounce, ...itemStyle } }/>
    </div>
  )

}

Spinner.propTypes = {
  fadeIn : PropTypes.bool,
  style : PropTypes.object,
  color : PropTypes.string,
  size : PropTypes.number
}

Spinner.defaultProps = {
  color : "#333",
  size : 18
}

window.addEventListener("DOMContentLoaded", () => {

  const style = document.createElement("style")

  style.type = "text/css"

  const keyFrames = `@keyframes spinnerBounceDelay {
  0%, 80%, 100% { transform: scale(0.0); }
  40% { transform: scale(1.0); }
}

@keyframes spinnerFadeIn {
  0% { opacity: 0; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}`

  style.innerHTML = keyFrames
  document.getElementsByTagName("head")[0].appendChild(style)

})

export default Spinner
