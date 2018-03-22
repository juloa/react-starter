import React from "react"
import Map from "../../Map"

const layers = [{
  source : {
    params : { LAYERS : "geostationary_cc_dust" },
    url : "http://synthese2:8080/public/api/ogc/wms/satellite/"
  },
  opacity : 0.7
}, {
  source : {
    params : { LAYERS : "T__ISOBARIC" },
    url : "http://synthese2:8080/public/api/ogc/wms/model/"
  },
  opacity : 0.7
}]

const style = {
  width : "100%",
  height : 500,
  border : "1px solid #ccc"
}

export default () => <Map layers={ layers } style={ style }/>
