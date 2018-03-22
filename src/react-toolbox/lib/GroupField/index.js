import React from "react"
import PropTypes from "prop-types"
import { FormGroup, ControlLabel, FormControl, HelpBlock } from "react-bootstrap"
import { injectIntl } from "react-intl"
import InputField from "../FormField/InputField"


function getValidationState({ touched, error, warning }) {

  if (!touched) return null
  else if (error) return "error"
  else if (warning) return "warning"
  else return null // "success"
}

export const GroupField = ({

  label,
  inline,
  labelWidth, // seulement si inline = true
  readonly,

  // ne pas se coucier de celles-ci
  type,
  style,
  intl,
  input,
  meta,
  ...rest

}) => {

  const styles = {
    formGroup : {
      ...style,
      ...(inline ? { display : "flex", alignItems : (readonly ? "baseline" : "center") } : null)
    },
    controlLabel : inline ? { width : labelWidth } : null,
    feedback : {
      position : "relative",
      ...(inline ? { flex : 1, position : "relative" } : null)
    }
  }

  const labelMessage = (intl && label && label.id) ? intl.formatMessage(label) : label

  const controlLabel = (
    <ControlLabel style={ styles.controlLabel }>
      { type !== "checkbox" && type !== "switch" && labelMessage }
    </ControlLabel>
  )

  let formControl = (
    <InputField
      type={ type }
      readonly={ readonly }
      label={ label }
      { ...input }
      { ...rest }
    />
  )

  const validationState = getValidationState(meta)

  let feedbackIcon = null
  let feedbackMessage = meta && meta.touched && (meta.error || meta.warning)

  if (validationState) {
    feedbackIcon = <FormControl.Feedback/>
    feedbackMessage = <HelpBlock>{ feedbackMessage }</HelpBlock>
  }

  return (
    <FormGroup style={ styles.formGroup } validationState={ getValidationState(meta) }>
      { controlLabel }
      <div style={ styles.feedback }>
        { formControl }
        { feedbackIcon }
        { feedbackMessage }
      </div>
    </FormGroup>
  )

}

GroupField.propTypes = {
  input : PropTypes.object,
  label : PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  type : PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  meta : PropTypes.object,
  intl : PropTypes.object,
  inline : PropTypes.bool,
  labelWidth : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style : PropTypes.object,
  readonly : PropTypes.bool
}

GroupField.defaultProps = {
  labelWidth : 120,
  meta : {}
}

export default injectIntl(GroupField)
