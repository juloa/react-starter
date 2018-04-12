import React from "react"
import PropTypes from "prop-types"
import Section from "../Section/"
import Code from "react-starter/src/react-toolbox/lib/Code"
import Properties from "./Properties"
import { Switch } from "react-router-dom"

const Descript = ({ construct, description, states, path, externalLink, namedImport, name }) => {

  let linkSection = null

  const Header = typeof description === "function" && React.isValidElement(description()) ? description() : description

  if (externalLink) {

    linkSection = (
      <Section title="Plus d'infos">
        <a href={ externalLink } target="_blank" rel="noopener noreferrer">
          { externalLink }
        </a>
      </Section>
    )

  }

  return (
    <section>
      <h2>Composant { name }</h2>
      <p>{ Header || "composant " + name }</p>

      <Switch>
        { states }
      </Switch>

      <Section title="Chemin">
        <Code>
          { `import ${namedImport ? "{ " + name + " }" : name} from "${path || "react-starter/src/components/" + name}"` }
        </Code>
      </Section>

      <Properties construct={ construct }/>

      { linkSection }

    </section>
  )

}

Descript.propTypes = {
  construct : PropTypes.func.isRequired,
  description : PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  namedImport : PropTypes.bool,
  states : PropTypes.node,
  path : PropTypes.string,
  externalLink : PropTypes.string,
  name : PropTypes.string
}


export default Descript
