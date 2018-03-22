/* eslint quote-props : 0 */

export default {
  "form" : {
    "maxWidth" : "330px",
    "padding" : "15px",
    "margin" : "0 auto",
    "textAlign" : "left"
  },
  "heading" : {
    "marginBottom" : "10px",
    "textAlign" : "center"
  },
  "checkbox" : {
    "marginBottom" : "10px",
    "fontWeight" : "normal"
  },
  "input" : {
    "position" : "relative",
    "height" : "auto",
    "boxSizing" : "border-box",
    "padding" : "10px",
    "fontSize" : "16px"
  },
  "email" : {
    "composes" : "input",
    "marginBottom" : "-1px",
    "borderBottomRightRadius" : "0",
    "borderBottomLeftRadius" : "0"
  },
  "password" : {
    "composes" : "input",
    "marginBottom" : "10px",
    "borderTopLeftRadius" : "0",
    "borderTopRightRadius" : "0"
  },
  spinner : {
    display : "inline-block"
  },
  alert : {
    marginTop : 10
  }
}
