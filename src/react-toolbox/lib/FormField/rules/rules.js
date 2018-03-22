/* eslint no-useless-escape:0 */
export const required = value => Boolean(value && value.length > 0)

export const minLength = min => value => Boolean(value && value.length >= min)

export const maxLength = max => value => {
  if (value) return Boolean(value.length <= max)
  else return true
}

export const slug = value => /^[\w-\.]+$/.test(value)

export const email = value => /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)
