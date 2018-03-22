import React from "react"
import Map from "../../Map"
import TileLayer from "ol/layer/tile"
import TileWMS from "ol/source/tilewms"
import OSM from "ol/source/osm"
// import SynopsisLayer from "components/Synopsis/Layer"
import { SortableContainer, SortableElement, arrayMove } from "react-sortable-hoc"
import { ListGroup, ListGroupItem } from "react-bootstrap"
import Button from "../../../Button"

const style = {
  width : "100%",
  height : 500,
  border : "1px solid #ccc"
}
/*
const tempeLayer = new SynopsisLayer("model", "T__ISOBARIC")

tempeLayer.opacity = 0.8
*/

const satLayer = new TileLayer({
  source : new TileWMS({
    params : { LAYERS : "geostationary_cc_dust" },
    url : "http://synthese2:8080/public/api/ogc/wms/satellite/"
  }),
  opacity : 0.8
})

const newLayer = new TileLayer({
  source : new TileWMS({
    params : { LAYERS : "TPW__ISOBARIC" },
    url : "http://synthese2.meteo.fr:8080//public/api/ogc/wms/model/"
  }),
  opacity : 0.5
})

const SortableItem = SortableElement(({ value }) => (
  <ListGroupItem>{ value }</ListGroupItem>
))

const SortableList = SortableContainer(({ items }) => (
  <ListGroup>
    { items.map((layer, i) => (
      <SortableItem
        key={ "item-" + i }
        index={ i }
        value={ "Layer n°" + i }
        style={ { cursor : "default" } }
      />
    )) }
  </ListGroup>
))

class LayersControl extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
      layers : [
        new TileLayer({ source : new OSM() }),
        // tempeLayer.createTile(),
        satLayer
      ]
    }

    this.handleSortEnd = this.handleSortEnd.bind(this)
    this.handleClick = this.handleClick.bind(this)

  }

  handleSortEnd({ oldIndex, newIndex }) {

    this.setState({
      layers : arrayMove(this.state.layers, oldIndex, newIndex)
    })
  }

  handleClick() {

    this.setState({ layers : [...this.state.layers, newLayer] })
  }

  render() {

    const { layers } = this.state

    return (
      <div style={ { display : "flex" } }>
        <div style={ { width : 250, marginRight : 20 } }>
          <SortableList items={ layers } onSortEnd={ this.handleSortEnd }/>
          { layers.length < 3 && (
            <Button
              bsStyle="primary"
              block
              icon="plus"
              onClick={ this.handleClick }
            >
              Add layer
            </Button>
          ) }
        </div>
        <Map layers={ layers } style={ style }/>
      </div>
    )
  }

}

export default LayersControl
