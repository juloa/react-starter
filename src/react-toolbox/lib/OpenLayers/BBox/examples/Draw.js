import React from "react"
import Ol from "../../Map"
import BBox from "../../BBox"
// import SynopsisLayer from "components/Synopsis/Layer"
import TileLayer from "ol/layer/tile"
import OSM from "ol/source/osm"


export default class Map extends React.Component {

  constructor(props) {

    super(props)

    // this.osmLayer = new SynopsisLayer("osm", "osm").createLayer()
    this.osmLayer = new TileLayer({ source : new OSM() })

    this.bboxLayer = new BBox({
      onChange(bbox) { console.log(bbox) }
    })

  }

  componentDidMount() {

    this.bboxLayer.setMap(this.ol.map)
    this.bboxLayer.editable = true
  }

  render() {

    return (
      <Ol layers={ [this.osmLayer, this.bboxLayer] } ref={ elmt => this.ol = elmt }/>
    )
  }

}
