import React from "react"
import cloneDeep from "lodash/fp/cloneDeep"

function processChildren(children, callback) {

  if (!children) return null
  else if (Array.isArray(children)) return children.map(callback)
  else return callback(children)

}

function processProps(props) {

  const res = {}

  for (const name in props) {

    if (props.hasOwnProperty(name)) {

      const value = props[name]

      if (name !== "children" && name !== "className" && typeof value !== "function") {

        if (typeof value === "object") res[name] = cloneDeep(value)
        else res[name] = value

      }

    }

  }

  return res

}

function processType(type) {

  switch (typeof type) {
  case "string" : return type
  case "function" : return getDisplayName(type)
  default : throw new TypeError((typeof type) + " : string or function required")
  }

}


const indentPattern = " "

function propsToStr(props, defaultProps = {}, indent = 0) {

  const keys = Object.keys(props).sort()

  const sep = (keys.length > 3) ? ("\n" + indentPattern.repeat(indent + 1)) : " "

  return keys.reduce((prev, key) => {

    if (key === "children") return prev

    // propriétés par défaut
    if (defaultProps[key] !== undefined && props[key] === defaultProps[key]) return prev

    const value = (typeof props[key] === "function") ? "function() {}" : JSON.stringify(props[key])

    return prev + sep + `${key}={ ${value} }`

  }, "")

}

function childrenToStr(childrenArg, indent = 0) {

  let children = processChildren(childrenArg, elmt => elmtToJSX(elmt, indent + 1))

  if (Array.isArray(children)) children = children.join("\n")

  return children

}

export function getDisplayName(elmt) {

  const name = elmt.displayName || elmt.name || ""

  return name.replace(/[A-Z]\w+\((\w+)\)/g, "$1")

}


export function objectToElmt(object) {

  if (!object || !object.type) return object

  return React.createElement(
    object.type,
    object.props,
    processChildren(object.children, objectToElmt)
  )

}


export function elmtToObject(elmt) {

  if (!elmt || typeof elmt !== "object") return elmt

  return {
    type : processType(elmt.type),
    props : processProps(elmt.props),
    children : processChildren(elmt.props.children, elmtToObject)
  }

}

export function JSONToElmt(json) {

  return objectToElmt(JSON.parse(json))

}

export function elmtToJSON(elmt) {

  return JSON.stringify(elmtToObject(elmt), null, 4)

}

export function elmtToJSX(elmt, indent = 0) {

  if (!elmt || typeof elmt === "string") return elmt || ""

  const tag = processType(elmt.type)
  const children = childrenToStr(elmt.props.children)
  const strIndent = indentPattern.repeat(indent)
  const strProps = propsToStr(elmt.props, elmt.type.defaultProps, indent)

  let jsxStr

  if (children) {

    jsxStr = `${strIndent}<${tag}${strProps}>
${strIndent + indentPattern + children}
${strIndent}</${tag}>`

  } else {

    jsxStr = `${strIndent}<${tag}${strProps}/>`

  }

  return jsxStr

}
