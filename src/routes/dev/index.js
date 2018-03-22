import React, { Component } from 'react';
import asyncComponent from "react-toolbox/lib/AsyncComponent";
import { Route, Switch } from 'react-router-dom';
import Main from "./components/Main"
import { hot } from 'react-hot-loader'

const AsyncCatalog = asyncComponent(() => import("./routes/catalog"));

class Dev extends Component {
  render() {
    return ( 
      <Switch>
        <Route path="/dev/catalog" component={AsyncCatalog} />
        <Route path="/dev" exact component={Main} />
      </Switch>
    )
  }
}

export default hot(module)(Dev)
