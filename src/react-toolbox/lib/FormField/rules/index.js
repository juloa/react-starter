import messages from "./messages"
import * as rules from "./rules"

function getMessage(intl, key, ...rest) {
  return intl ? intl.formatMessage(messages[key], ...rest) : messages[key].defaultMessage
}

export const required = (value, allValues, { intl }) => {
  return rules.required(value) ? null : getMessage(intl, "errorRequired")
}

export const minLength = min => {

  const validate = rules.minLength(min)

  return (value, allValues, { intl }) => {
    return validate(value) ? null : getMessage(intl, "errorMinLength", { value : min })
  }

}

export const maxLength = max => {

  const validate = rules.maxLength(max)

  return (value, allValues, { intl }) => {
    return validate(value) ? null : getMessage(intl, "errorMaxLength", { value : max })
  }

}

export const slug = (value, allValues, { intl }) => {
  return rules.slug(value) ? null : getMessage(intl, "slugInvalid")
}

export const email = (value, allValues, { intl }) => {
  return rules.email(value) ? null : getMessage(intl, "errorInvalid")
}
