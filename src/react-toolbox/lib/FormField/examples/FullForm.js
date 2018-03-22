import React from "react"
import PropTypes from "prop-types"
import wrapForm from "./wrapForm"
import FormField from "../"
import moment from "moment"
import { minLength, maxLength } from "../rules"

const FullForm = ({ readonly, inline, labelWidth, disabled }) => {

  const props = { readonly, inline, labelWidth, disabled }

  return (
    <div>
      <FormField
        name="name"
        type="text"
        label="Nom"
        placeholder="Your Name"
        validate={ [minLength(2), maxLength(10)] }
        { ...props }
      />
      <FormField
        name="pwd"
        type="password"
        label="Password"
        { ...props }
      />
      <FormField
        name="date"
        type="date"
        label="Date"
        { ...props }
      />
      <FormField
        name="period"
        type="date-range"
        label="Période"
        enableOutsideDays
        { ...props }
      />
      <FormField
        name="client"
        type="select"
        label="Client"
        { ...props }
      >
        <option>Toto</option>
        <option>Tata</option>
      </FormField>
      <FormField
        name="clients"
        type="select"
        label="Multi-Client"
        multi
        { ...props }
      >
        <option value="hdzaudhzah">Toto</option>
        <option value="fheuzhfuiezhfei">Tata</option>
      </FormField>
      <FormField
        name="threshold_min"
        type="slider"
        label="Seuillage par valeur min"
        min={ -200 }
        max={ 200 }
        step={ 0.5 }
        { ...props }
      />
      <FormField
        name="multislider"
        type="slider"
        label="Multi-slider"
        { ...props }
        min={ -200 }
        max={ 200 }
        step={ 0.5 }
        range={ 3 }
        pushable
      />
      <FormField
        name="conditions"
        type="checkbox"
        label="J'accepte les conditions de vente"
        { ...props }
      />
      <FormField
        name="newsletter"
        type="switch"
        label="Newsletter"
        { ...props }
      />
      <FormField
        name="diet"
        type="group"
        label="Diet"
        { ...props }
      >
        <option value="vegan">vegan</option>
        <option value="vegetarian">végétarien</option>
        <option value="flexitarian">flexitarien</option>
        <option value="omnivorous">omnivore</option>
      </FormField>
      <FormField
        name="commentaire"
        type="textarea"
        label="commentaire"
        { ...props }
      />
    </div>
  )
}

FullForm.propTypes = {
  readonly : PropTypes.bool,
  inline : PropTypes.bool,
  labelWidth : PropTypes.number,
  disabled : PropTypes.bool
}

const initialValues = {
  name : "Yannick",
  pwd : "toto",
  date : moment(),
  period : {
    startDate : moment(),
    endDate : moment()
  },
  client : "Toto",
  clients : ["fheuzhfuiezhfei"],
  threshold_min : 0,
  multislider : [-50, 0, 40, 80],
  conditions : true,
  newsletter : null,
  diet : "flexitarian",
  genre : "Rock",
  commentaire : "Salut"
}

export default wrapForm(FullForm, initialValues)
