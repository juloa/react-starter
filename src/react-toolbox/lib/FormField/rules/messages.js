import { defineMessages } from "react-intl"

export default defineMessages({
  errorRequired : {
    id : "core.error_required",
    defaultMessage : "Please enter a value"
  },
  errorMinLength : {
    id : "core.error_min_length",
    defaultMessage : "Must be greater than {value}"
  },
  errorMaxLength : {
    id : "core.error_max_length",
    defaultMessage : "Must be lower than { value }"
  },
  errorInvalid : {
    id : "core.error_invalid",
    defaultMessage : "Invalid Value"
  },
  slugInvalid : {
    id : "core.slug_invalid",
    defaultMessage : "Invalid Value: Please use only numbers,letters or _ . -"
  }
})
