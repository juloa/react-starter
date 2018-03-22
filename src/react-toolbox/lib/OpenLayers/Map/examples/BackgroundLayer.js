import React from "react"
import Map from "../../Map"
import TileWMS from "ol/source/tilewms"
import TileLayer from "ol/layer/tile"
import OSM from "ol/source/osm"

const backgroundLayer = new TileLayer({ source : new OSM() })

const layers = [
  new TileLayer({
    source : new TileWMS({
      params : { LAYERS : "NEBUL__GROUND", STYLES : "" /* ,token : apis.auth.getToken() */},
      url : "http://synthese2:8080//public/api/ogc/wms/model" // "http://217.182.158.104:8080//public/api/ogc/wms/model"
    }),
    opacity : 0.7
  })
]

const style = {
  width : "100%",
  height : 500,
  border : "1px solid #ccc"
}

export default () => <Map layers={ layers } backgroundLayer={ backgroundLayer } style={ style }/>
