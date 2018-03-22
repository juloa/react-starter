import React from "react"
import PropTypes from "prop-types"
import { Radio, Checkbox } from "react-bootstrap"

const styles = {
  container : {
    padding : "7px 0",
    minHeight : 34
  }
}

const Classic = ({ value, options, name, onChange, multi, style, disabled, ...rest }) => {

  delete rest.intl
  delete rest.onBlur
  delete rest.bsStyle

  const Construct = multi ? Checkbox : Radio


  return (
    <div { ...rest } style={ { ...styles.container, ...style } }>
      { options.map((opt, i) => {


        function handleChange(e) {

          const checked = e.target.checked

          let newValue

          if (multi) {

            newValue = [...value]

            if (checked) newValue.push(opt.value)
            else newValue.splice(newValue.indexOf(opt.value), 1)

          } else if (checked) newValue = opt.value
          else newValue = null

          onChange(newValue)
        }

        let checked

        if (multi) {

          checked = value.find(val => val === opt.value)
          checked = Boolean(checked)

        } else {

          checked = (opt.value === value)
        }


        return (

          <Construct
            inline
            key={ i }
            value={ opt.value }
            name={ name }
            checked={ checked }
            onChange={ handleChange }
            style={ { marginRight : 30 } }
            disabled={ disabled }
          >
              { opt.label }
          </Construct>

        )

      }) }
    </div>
  )
}

Classic.propTypes = {
  name : PropTypes.string,
  onChange : PropTypes.func,
  label : PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  intl : PropTypes.object,
  value : PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  multi : PropTypes.bool,
  style : PropTypes.object,
  options : PropTypes.array,
  disabled : PropTypes.bool
}

export default Classic
