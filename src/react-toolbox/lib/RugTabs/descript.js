import React from "react"
import RugTabs from "./"

export default {

  categ : "Presentation",

  construct : RugTabs,

  states : {

    default : () => (
      <RugTabs>
        <div eventKey={ 1 } title="Home">Home Content</div>
        <div eventKey={ 2 } title="Tab 1">Tab 1 Content</div>
        <div eventKey={ 3 } title="Tab 2">Tab 2 Content</div>
        <div eventKey={ 4 } title="Tab 3">Tab 3 Content</div>
        <div eventKey={ 5 } title="Tab 4">Tab 4 Content</div>
        <div eventKey={ 6 } title="Tab 5">Tab 5 Content</div>
        <div eventKey={ 7 } title="Tab 6">Tab 6 Content</div>
        <div eventKey={ 8 } title="Tab 7">Tab 7 Content</div>
        <div eventKey={ 9 } title="Tab 8">Tab 8 Content</div>
      </RugTabs>
    )

  }
}
