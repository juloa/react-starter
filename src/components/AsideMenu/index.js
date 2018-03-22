import React from "react"
import PropTypes from "prop-types"
import TreeMenu from "react-toolbox/lib/TreeMenu"
import Glyphicon from "react-bootstrap/lib/Glyphicon"
import { injectIntl } from "react-intl"
import messages from "./messages"
import classNames from "./style.module.css"


class AsideMenu extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      items : [
        { label : props.intl.formatMessage(messages.menu_level1),
          items : [{
            label : props.intl.formatMessage(messages.menu_examples),
            icon : <Glyphicon glyph="pencil"/>,
            link : "/examples"
          }]
        },
        { label : "Dev",
          items : [{
            label : "Catalog",
            icon : <Glyphicon glyph="star"/>,
            link : "/dev/catalog"
          }]
        }
      ]
    }

  }
  render() {
    return (<div className={ classNames.menuLeft }><TreeMenu items={ this.state.items }/></div>)
  }

}

AsideMenu.propTypes = {
  intl : PropTypes.object
}

export default injectIntl(AsideMenu)
