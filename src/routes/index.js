/* Import the async components */
import React from "react"
import asyncComponent from "react-starter/src/react-toolbox/lib/AsyncComponent"
import { Route, Switch } from "react-router-dom"

const AsyncHome = asyncComponent(() => import("./Home"))
const AsyncExample = asyncComponent(() => import("./Example"))
const AsyncNotFound = asyncComponent(() => import("./NotFound"))
const AsyncDev = asyncComponent(() => import("./dev"))


/* Use components to define routes (components will dynamically load when route matches) */
export default () =>
  (<Switch>
    <Route path="/" exact component={ AsyncHome } />
    <Route path="/home" exact component={ AsyncHome } />
    <Route path="/examples" component={ AsyncExample } />
    <Route path="/dev" component={ AsyncDev } />
    <Route component={ AsyncNotFound } />
  </Switch>)

