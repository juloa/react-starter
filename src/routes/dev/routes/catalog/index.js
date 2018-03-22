import React from "react"
import Sidebar from "./components/Sidebar"
import { Route, Switch } from 'react-router-dom';
import items from "./descriptions"
import Descript from "./components/Descript"
import State from "./components/State"
import { getDisplayName } from "react-toolbox/lib/jsx-serializer"


function createRoute(item,keyComponent) {
  
    const construct = item.construct || item.constructor
    const description = item.descript || item.description
    const link = item.link || item.externalLink
    const name = item.name || getDisplayName(construct)

    const states = Object.keys(item.states).map(key => {
      
      const state = item.states[key]
      const descript = state.descript || state.description || key
      const render = state.render || state
      const fullCode = "test";//state.fullCode

      const stateComponent = () => (<State
            description={ descript }
            component={ render() }
            hideComponent={ state.hideComponent }
            fullCode={ fullCode }
          />)

      const path = "/dev/catalog/"+name+"/"+key

     // console.log(path)
      
      return (
          <Route key={key} path={path} component={stateComponent} />
        )
    })
  
    const Component = () => (
      <Descript
        
        name={ name }
        construct={ construct }
        namedImport={ Boolean(item.namedImport) }
        description={ description }
        states={ states }
        path={ item.path }
        externalLink={ link }
      />
    )

    //.log(name)

    return (
      <Route key={keyComponent} path={"/dev/catalog/"+name} component={Component} />
    )
  }

  
class Main extends React.Component {

  constructor(props) {
    
      super(props)

      var routes = [];
      for (var i = 0; i < items.length; i++) {
          routes.push(createRoute(items[i],i));
      }
  
      this.state = { routes }
  }  

  render() {
    return (
      <div style={ { display : "flex", justifyContent : "stretch", height : "100%" } }>
        <Sidebar style={ { width : 250, backgroundColor : "rgba(163,175,183,.9)", height : "100%",minHeight:"100vh" } }/>
        
        
        <div style={ { flex : 1, padding : 10, backgroundColor : "white" } }>
          <Switch>
            {this.state.routes}
            <Route path="*" component={ () => (<p>Cliquez sur le composant de votre choix dans la barre latérale.</p>)} />
          </Switch>
          
        </div>
      </div>
    )
  }
}

export default Main

