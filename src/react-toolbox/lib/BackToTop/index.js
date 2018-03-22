import React from "react"
import PropTypes from "prop-types"

export default class BackToTop extends React.Component {

  constructor(props) {

    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleScroll = this.handleScroll.bind(this)

    this.state = { display : false }

  }

  smoothScroll() {

    const start = Number(new Date())
    const totalScroll = window.scrollY

    function scroll() {

      new Promise(resolve => {

        window.requestAnimationFrame(() => {

          if (window.scrollY > 0) {

            const time = Number(new Date())
            const value = totalScroll - (totalScroll * (time - start) / 300)

            window.scrollTo(0, value)
          }

          resolve()
        })

      })
      .then(() => {
        if (window.scrollY > 0) return scroll()
        else return null
      })

    }

    scroll()
  }

  handleClick() {

    this.smoothScroll()
  }

  handleScroll() {

    this.setState({ display : window.scrollY >= this.props.displayPoint })
  }

  componentWillMount() {

    window.addEventListener("scroll", this.handleScroll)

    this.handleScroll()
  }

  componentWillUnmount() {

    window.removeEventListener("scroll", this.handleScroll)
  }

  render() {

    let { style, ...rest } = this.props

    delete rest.displayPoint

    if (!this.state.display) style = { ...style, display : "none" }

    return (
      <div style={ style } onClick={ this.handleClick } { ...rest }>
        { this.props.children }
      </div>
    )
  }

}

BackToTop.propTypes = {
  children : PropTypes.node,
  displayPoint : PropTypes.number,
  style : PropTypes.object
}

BackToTop.defaultProps = { displayPoint : 500 }
