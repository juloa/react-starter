import React from "react"
import PropTypes from "prop-types"
import createMap from "../../../HOC/createMap"
import TileWMS from "ol/source/tilewms"
import TileLayer from "ol/layer/tile"
import OSM from "ol/source/osm"
import GroupField from "../../../GroupField"
import { connect } from "react-redux"

const layers = [
  new TileLayer({
    source : new OSM()
  }),
  new TileLayer({
    source : new TileWMS({
      params : { LAYERS : "geostationary_cc_dust" },
      url : "http://synthese2:8080/public/api/ogc/wms/satellite/"
    }),
    opacity : 0.7
  })
]

const style = {
  width : "100%",
  height : 500,
  border : "1px solid #ccc"
}

const STATE_PROPERTY = "mySimpleMap"

const Map = createMap(STATE_PROPERTY)

class MapWithViewControl extends React.Component {

  constructor(props) {

    super(props)

    this.handleChangeLat = this.handleChangeLat.bind(this)
    this.handleChangeLon = this.handleChangeLon.bind(this)
    this.handleChangeZoom = this.handleChangeZoom.bind(this)
    this.handleChangeRotation = this.handleChangeRotation.bind(this)
  }

  handleChangeLat(value) {

    const { setCenterLat } = Map.actions
    const { dispatch } = this.props

    dispatch(setCenterLat(value))
  }

  handleChangeLon(value) {

    const { setCenterLon } = Map.actions
    const { dispatch } = this.props

    dispatch(setCenterLon(value))
  }

  handleChangeZoom(value) {

    const { setZoom } = Map.actions
    const { dispatch } = this.props

    dispatch(setZoom(value))
  }

  handleChangeRotation(value) {

    const { setRotation } = Map.actions
    const { dispatch } = this.props

    dispatch(setRotation(value))
  }

  render() {

    const { center : { lat, lon }, zoom, rotation } = this.props

    return (
      <div style={ { display : "flex" } }>
        <div style={ { width : 250, marginRight : 20 } }>
          <GroupField
            type="number"
            name="lat"
            label="latitude"
            value={ lat }
            onChange={ this.handleChangeLat }
            step={ 0.2 }
          />
          <GroupField
            type="number"
            name="lon"
            label="longitude"
            value={ lon }
            onChange={ this.handleChangeLon }
            step={ 0.2 }
          />
          <GroupField
            type="number"
            name="zoom"
            label="zoom"
            value={ zoom }
            onChange={ this.handleChangeZoom }
            step={ 0.1 }
          />
          <GroupField
            type="number"
            name="rotation"
            label="rotation"
            value={ rotation }
            onChange={ this.handleChangeRotation }
            step={ 1 }
          />
        </div>
        <Map layers={ layers } style={ style }/>
      </div>
    )
  }

}

MapWithViewControl.propTypes = {
  center : PropTypes.object,
  zoom : PropTypes.number,
  rotation : PropTypes.number,
  dispatch : PropTypes.func
}

const round = (num, nbDecimales = 2) => Number(num.toFixed(nbDecimales))

function mapStateToProps(state) {

  const view = state[STATE_PROPERTY].get("view")
  const zoom = round(view.get("zoom"))
  const rotation = round(view.get("rotation"))
  const center = view.get("center").toJS()

  center.lat = round(center.lat)
  center.lon = round(center.lon)

  return { center, zoom, rotation }
}

export default connect(mapStateToProps)(MapWithViewControl)
