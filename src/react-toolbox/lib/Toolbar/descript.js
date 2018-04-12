import React from "react"
import Toolbar from "./"
import TreeMenu from "react-starter/src/react-toolbox/lib/TreeMenu"

const items = [{
  icon : "home",
  label : "Button 1",
  link : "toto",
  items : [{
    label : "Home",
    link : "/"
  }, {
    label : "Get started",
    collapsed : true,
    items : [{ label : "Installation" }, { label : "Code" }, {
      label : "Examples",
      collapsed : true,
      items : [{ label : "Basic" }, { label : "Persons" }, { label : "DataConfig" }]
    }, { label : "Tips" }]
  }]
}, {
  icon : "trash",
  label : "Button 2",
  items : [{
    label : "Home",
    link : "/"
  }, {
    label : "Get started",
    items : [{ label : "Installation" }, { label : "Code" }, {
      label : "Examples",
      items : [{ label : "Basic" }, { label : "Persons" }, { label : "DataConfig" }]
    }, { label : "Tips" }]
  }]
}, {
  icon : "user",
  label : "Button 2",
  items : [{
    label : "Home",
    link : "/"
  }, {
    label : "Get started",
    items : [{ label : "Installation" }, { label : "Code" }, {
      label : "Examples",
      items : [{ label : "Basic" }, { label : "Persons" }, { label : "DataConfig" }]
    }, { label : "Tips" }]
  }]
}]

export default {

  construct : Toolbar,

  path : "react-starter/src/components/Toolbar",

  name : "Toolbar",

  states : {

    default : () => <Toolbar items={ items }/>,

    dark : () => <Toolbar items={ items } dark/>,

    horizontal : () => <Toolbar items={ items } dark orientation="row"/>,

    declarative : () => (
      <Toolbar dark>
        <Toolbar.Item icon="equalizer" label="Link" link="/"/>
        <Toolbar.Item icon="home" label="Button1">
          <TreeMenu dark>
            <TreeMenu.Item collapsed collapsible label={ "Collapsible Menu" }>
              <TreeMenu>
                <TreeMenu.Item>
                  Submenu Item 1
                </TreeMenu.Item>
                <TreeMenu.Item>
                  Submenu Item 2
                </TreeMenu.Item>
              </TreeMenu>
            </TreeMenu.Item>
            <TreeMenu.Item>
              Simple Item
            </TreeMenu.Item>
          </TreeMenu>
        </Toolbar.Item>
        <Toolbar.Item icon="trash" label="Button2">
          <TreeMenu dark>
            <TreeMenu.Item collapsible label={ "Collapsible Menu" }>
              <TreeMenu>
                <TreeMenu.Item>
                  Submenu Item 1
                </TreeMenu.Item>
                <TreeMenu.Item>
                  Submenu Item 2
                </TreeMenu.Item>
              </TreeMenu>
            </TreeMenu.Item>
            <TreeMenu.Item>
              Simple Item
            </TreeMenu.Item>
          </TreeMenu>
        </Toolbar.Item>
        <Toolbar.Item icon="user" label="Button3">
          <div style={ { padding : 20 } }>Hello world</div>
        </Toolbar.Item>
      </Toolbar>
    )
  }
}
