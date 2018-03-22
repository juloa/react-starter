import React from "react"
import PropTypes from "prop-types"
import SyntaxHighlighter from "react-syntax-highlighter"
import { docco } from 'react-syntax-highlighter/styles/hljs'

export function Code({ children, language }) {

  return (
    <SyntaxHighlighter language={ language } style={ docco }>
      { children }
    </SyntaxHighlighter>
  )

}

Code.propTypes = {
  language : PropTypes.string.isRequired,
  children : PropTypes.node
}

Code.defaultProps = { language : "jsx" }

export default Code
