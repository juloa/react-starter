import React from "react"
import Form from "./"

import Example1 from "./examples/example1"
import Source1 from "./examples/example1.js?txt"

import Example2 from "./examples/example2"
import Source2 from "./examples/example2.js?txt"

import Example3 from "./examples/example3"
import Source3 from "./examples/example3.js?txt"

import Example4 from "./examples/example4"
import Source4 from "./examples/example4.js?txt"

import Example5 from "./examples/example5"
import Source5 from "./examples/example5.js?txt"

import Example6 from "./examples/example6"
import Source6 from "./examples/example6.js?txt"

export default {

  construct : Form,

  descript : `Wrapper qui permet d'agir de manière globale sur les propriétes inline,
  readonly et labelWidth des composants FormField contenus dans le formulaire`,

  path : "components/Form",

  states : {
    default : {
      render : () => <Example1/>,
      fullCode : Source1
    },
    inline : {
      render : () => <Example2/>,
      fullCode : Source2
    },
    labelWidth : {
      render : () => <Example5/>,
      fullCode : Source5
    },
    readonly : {
      render : () => <Example3/>,
      fullCode : Source3
    },
    readonlyInline : {
      render : () => <Example4/>,
      fullCode : Source4
    },
    overloadField : {
      render : () => <Example6/>,
      fullCode : Source6
    }
  }
}
