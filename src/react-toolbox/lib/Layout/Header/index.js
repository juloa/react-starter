import React from "react"
import PropTypes from "prop-types"
import classNames from "./style.module.css"
import classNames2 from "react-starter/src/assets/mfi/custom.module.css"

import logo from "../assets/images/charte_mfi_2016/logo_mfi_blanc.png"
import logoclient from "react-starter/src/assets/mfi/images/logo_asecna_white.png"

import { name, version } from "../../../../../package.json"

import LogoutButton from "../LogoutButton"
import UserName from "../UserName"

export const Header = ({ className, ...rest }) => (
  <div { ...rest } className={ classNames.header + (className ? " " + className : "") }>
    <div className={ classNames.divLogo }>
      <img className={ classNames.logoMfi } src={ logo } alt="logo" />
    </div>
    <div className={ classNames.divHeader }>
      <ul className={ "nav " + classNames.navbarToolbar }>
        <li className={ classNames2.titlebar }>
          <span className={ classNames.productTitle }>{name}</span>
          <span className={ classNames.version }>{version}</span>
        </li>
      </ul>
      <ul className={ "nav navbar-right " + classNames.navbarToolbar } >
        <li className="hidden-float">
          <img className={ classNames.logoClient } src={ logoclient } alt="logoclient" />
        </li>
        <li className={ classNames.profil }>
          <div className={ classNames.quidam }>
            Vous êtes connecté en tant que
            &nbsp;<strong><UserName /></strong>
            <span /><br />
            <LogoutButton className={ classNames.btnMini } >Logout</LogoutButton>
            <a
              href="/help"
              className={ "btn " + classNames.btnMini }
              target="_blank"
              rel="noopener noreferrer"
            >
              Help
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
)

Header.propTypes = {
  style : PropTypes.object,
  className : PropTypes.string
}

export default Header
