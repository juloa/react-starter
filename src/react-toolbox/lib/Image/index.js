/*eslint jsx-a11y/alt-text:0*/
import React from "react"
import PropTypes from "prop-types"
import Spinner from "../Spinner"
import Alert from "react-bootstrap/lib/Alert"
import { FormattedMessage } from "react-intl"

const styles = {
  divSpinner : {
    display : "flex",
    alignItems : "center",
    justifyContent : "center"
  },
  spinner : { margin : "auto" },
  alert : {
    textOverflow : "ellipsis",
    whiteSpace : "nowrap",
    overflow : "hidden"
  }
}

class Image extends React.PureComponent {

  constructor(props) {

    super(props)

    this.state = {
      image : null,
      isLoading : false,
      error : null
    }

  }

  toDataURL() {

    const canvas = document.createElement("canvas")

    canvas.width = this.image.width
    canvas.height = this.image.height

    const ctx = canvas.getContext("2d")

    ctx.drawImage(this.image, 0, 0)

    return canvas.toDataURL("image/png")

  }

  loadImage(src) {

    this.setState({ image : null, isLoading : true, error : null })

    const img = document.createElement("img")

    img.onload = () => this.setState({ isLoading : false, image : this.toDataURL(img) })
    img.onerror = e => this.setState({ isLoading : false, error : e })

    img.crossOrigin = ""
    img.src = src

    this.image = img

  }

  componentWillUpdate(nextProps) {

    if (this.props.src !== nextProps.src) this.loadImage(nextProps.src)

  }

  componentDidMount() {

    if (!this.image && !this.state.isLoading) this.loadImage(this.props.src)

  }

  render() {

    const { style, src, alt, spinnerColor, svg, ...rest } = this.props

    let component

    if (this.state.isLoading) {

      component = (
        <div
          { ...rest }
          style={ { ...styles.divSpinner, ...style } }
        >
          <Spinner color={ spinnerColor } style={ styles.spinner }/>
        </div>
      )

      if (svg) {

        component = (
          <foreignObject width="100%" height="100%">
            { component }
          </foreignObject>
        )

      }

    } else if (this.state.error) {

      component = (
        <Alert
          title={ alt || src }
          { ...rest }
          bsStyle="danger"
          style={ { ...styles.alert, ...style } }
        >
          <FormattedMessage id="toolbox.unable_to_load_image" defaultMessage="Unable to load image" />
          &nbsp;{ alt || src }
        </Alert>
      )

      if (svg) {

        component = (
          <foreignObject width="100%" height="100%">
            { component }
          </foreignObject>
        )

      }

    } else if (svg) {

      component = <image xlinkHref={ this.state.image } { ...{ style, alt } } { ...rest }/>

    } else {

      component = <img src={ this.state.image } { ...{ style, alt } } { ...rest }/>

    }

    return component

  }

}


Image.propTypes = {
  src : PropTypes.string,
  alt : PropTypes.string,
  style : PropTypes.object,
  spinnerColor : PropTypes.string,
  svg : PropTypes.bool
}

Image.defaultProps = { svg : false }

export default Image
