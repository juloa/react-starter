import React from "react"
import PropTypes from "prop-types"
import Affix from "../Affix"
import BackToTop from "../BackToTop"
import Button from "../Button"
import Spinner from "react-toolbox/lib/Spinner"
import { FormattedMessage as Text } from "react-intl"
import messages from "./messages"

const styles = {
  container : {
    display : "flex",
    alignItems : "start"
  },
  backToTop : {
    marginLeft : 50
  },
  spinner : {
    marginLeft : 50,
    marginTop : 7
  }
}

const AffixBar = ({ children, style, spinner, ...rest }) => (
  <Affix { ...rest } style={ { ...style, ...styles.container } }>
    { children }
    <BackToTop style={ styles.backToTop } displayPoint={ 200 }>
      <Button icon="arrow-up">
        <Text { ...messages.backToTop }/>
      </Button>
    </BackToTop>
    { spinner && <Spinner style={ styles.spinner }/> }
  </Affix>
)

AffixBar.propTypes = {
  children : PropTypes.node,
  style : PropTypes.object,
  spinner : PropTypes.bool
}

export default AffixBar
