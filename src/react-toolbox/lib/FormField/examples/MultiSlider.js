/* eslint react/prop-types:0 */
import React from "react"
import FormField from "../"
import wrapForm from "./wrapForm"

const Field = ({ readonly, inline, disabled }) => (
  <FormField
    name="multislider"
    type="slider"
    label="Multi-slider"
    readonly={ readonly }
    inline={ inline }
    disabled={ disabled }
    min={ -200 }
    max={ 200 }
    step={ 0.5 }
    count={ 1 }
    pushable
  />
)

const initialValues = {
  multislider : [-180, -20, 50, 60]
}

export default wrapForm(Field, initialValues)
