import React from "react"
import TreeMenu from "./"

const items = [{ label : "Home", link : "/" }, {

  label : "Get started",
  collapsed : true,
  items : [{ label : "Installation" }, { label : "Code" }, {
    label : "Examples",
    collapsible : false,
    items : [{ label : "Basic" }, { label : "Persons" }, { label : "DataConfig" }]
  }, { label : "Tips" }]

}]

export default {

  categ : "Presentation",

  construct : TreeMenu,

  states : {

    default : () => <TreeMenu items={ items }/>,

    dark : () => <TreeMenu items={ items } dark/>,

    declarative : () => (
      <TreeMenu dark>
        <TreeMenu.Item label="Collapsible Menu" collapsible collapsed>
          <TreeMenu>
            <TreeMenu.Item> Submenu Item 1 </TreeMenu.Item>
            <TreeMenu.Item> Submenu Item 2 </TreeMenu.Item>
          </TreeMenu>
        </TreeMenu.Item>
        <TreeMenu.Item> Simple Item </TreeMenu.Item>
        <TreeMenu.Item label="With submenus">
          <TreeMenu>
            <TreeMenu.Item> Submenu Item 1 </TreeMenu.Item>
            <TreeMenu.Item> Submenu Item 2 </TreeMenu.Item>
          </TreeMenu>
        </TreeMenu.Item>
      </TreeMenu>
    )

  }
}
