/* eslint react/prop-types:0 */
import React from "react"
import FormField from "../"
import wrapForm from "./wrapForm"

const Field = ({ readonly, inline, disabled }) => (
  <FormField
    name="threshold_min"
    type="slider"
    label="Seuillage par valeur min"
    readonly={ readonly }
    inline={ inline }
    disabled={ disabled }
    min={ -200 }
    max={ 200 }
    step={ 0.5 }
    bsStyle="primary"
  />
)

const initialValues = {
  threshold_min : -2147483640
}

export default wrapForm(Field, initialValues)
