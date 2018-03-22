import React, { Component } from 'react';
import asyncComponent from "react-toolbox/lib/AsyncComponent";
import { Route, Switch } from 'react-router-dom';
import Main from "./components/Main"

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



export default Dev
