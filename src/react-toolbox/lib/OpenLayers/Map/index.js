/* eslint max-len:0, max-statements:0 */

import React from "react"
import PropTypes from "prop-types"
import OlMap from "ol/map"
import View from "ol/view"
import interaction from "ol/interaction"
import Collection from "ol/collection"
import control from "ol/control"
import isEqual from "lodash/isEqual"
import { ucfirst } from "jsyg-strutils"
import "ol/ol.css"

import isPlainObject from "lodash.isplainobject"
import proj4 from "proj4"
import projections from "../projections"
import proj from "ol/proj"

for (const code in projections) proj4.defs(code, projections[code])

proj.setProj4(proj4)

export default class Map extends React.Component {

  constructor(props) {

    super(props)

    this.triggerChange = this.triggerChange.bind(this)
    this.createLayer = this.createLayer.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
  }

  createLayer(layer) {

    if (!isPlainObject(layer)) return layer

    const LayerConstruct = require("ol/layer/" + (layer.construct || "tile").toLowerCase()).default

    const source = this.createSource(layer.source)

    return new LayerConstruct({ visible : true, opacity : 1, ...layer, source })
  }

  createSource(source) {

    if (!isPlainObject(source)) return source

    const SourceConstruct = require("ol/source/" + (source.construct || "tilewms").toLowerCase()).default

    const { ...options } = source

    delete options.construct

    return new SourceConstruct(options)
  }

  createInteractions() {

    const { interactions } = this.props

    if (interactions instanceof Collection) return interactions
    else if (Array.isArray(interactions)) {

      return new Collection(interactions.map(elmt => {
        if (isPlainObject(elmt)) {

          return new interaction[elmt.construct](elmt.options)

        } else return elmt
      }))

    } else throw new Error("invalid interactions property")
  }

  getAllLayers(props) {

    const { layers, backgroundLayer } = props || this.props

    const allLayers = [...layers]

    if (backgroundLayer) allLayers.unshift(backgroundLayer)

    return allLayers

  }

  shouldComponentUpdate(nextProps) {

    if (this.mousedown === true) return false

    const { map, props } = this

    if (nextProps.view.projection === props.view.projection) {

      ["zoom", "center", "rotation"].forEach(prop => {
        const newValue = nextProps.view[prop]

        if (!isEqual(newValue, props.view[prop])) {
          const method = "set" + ucfirst(prop)

          this.view[method](newValue)
        }
      })

    } else {

      map.setView(this.createView(nextProps.view))
      map.getLayers().forEach(layer => layer.getSource().refresh())
    }


    const oldLayers = this.getAllLayers(props)
    const newLayers = this.getAllLayers(nextProps)

    if (!isEqual(oldLayers, newLayers)) {

      const openLayers = map.getLayers()

      newLayers.forEach((newLayer, i) => {

        if (isEqual(newLayer, oldLayers[i])) return

        const openLayer = openLayers.item(i)

        if (openLayer && isPlainObject(newLayer)) {

          if (!isEqual(newLayer.source, oldLayers[i].source)) {
            openLayer.setSource(this.createSource(newLayer.source))
          }

          for (const n in newLayer) {

            if (n !== "source" && newLayer[n] !== openLayer.get(n)) {
              openLayer.set(n, newLayer[n])
            }
          }

        } else openLayers.setAt(i, this.createLayer(newLayer))

      })

      while (openLayers.getLength() > newLayers.length) openLayers.pop()
    }

    if (!isEqual(nextProps.interactions, props.interactions)) {

      const interactions = this.createInteractions(nextProps.interactions)

      const list = map.getInteractions()

      list.clear()

      interactions.forEach(item => map.addInteraction(item))
    }

    ["control", "overlay"].forEach(type => {

      const prop = type + "s"

      if (isEqual(nextProps[prop], props[prop])) return

      const getList = "get" + ucfirst(prop)
      const list = map[getList]()

      list.clear()

      nextProps[prop].forEach(item => {

        const add = "add" + ucfirst(type)

        map[add](item)
      })

    })

    return false
  }

  createView({ ...options }) {

    const { onChangeView } = this.props

    const view = new View(options)

    if (onChangeView) view.on("propertychange", onChangeView)

    return view
  }

  triggerChange(e) {

    const { props } = this

    switch (e.key) {

    case "size" :
      if (props.onChangeSize) props.onChangeSize(e.target.getSize())
      break

    default : break

    }

  }

  handleMouseDown() {

    this.mousedown = true
  }

  handleMouseUp() {

    this.mousedown = false
  }

  componentDidMount() {

    const { interactions, view, controls, overlays, onMount } = this.props

    this.view = this.createView(view)

    const map = new OlMap({
      target : this.container,
      layers : this.getAllLayers().map(this.createLayer),
      interactions : this.createInteractions(interactions),
      controls,
      overlays,
      view : this.view
    })

    map.on("propertychange", this.triggerChange)

    this.container.addEventListener("mousedown", this.handleMouseDown)
    this.container.addEventListener("mouseup", this.handleMouseUp)

    this.map = map

    if (onMount) onMount(map)
  }

  componentWillUnmount() {

    this.container.removeEventListener("mousedown", this.handleMouseDown)
    this.container.removeEventListener("mouseup", this.handleMouseUp)
  }

  render() {

    const { ...rest } = this.props

    for (const n in this.constructor.propTypes) delete rest[n]

    return (
      <div
        ref={ node => this.container = node }
        { ...rest }
      />
    )
  }

}

Map.propTypes = {
  layers : PropTypes.array,
  backgroundLayer : PropTypes.object,
  interactions : PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  controls : PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  overlays : PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  view : PropTypes.object,
  onChangeView : PropTypes.func,
  onChangeSize : PropTypes.func,
  onMount : PropTypes.func
}

Map.defaultProps = {
  layers : [],
  interactions : interaction.defaults(),
  controls : control.defaults({ attribution : false }),
  overlays : [],
  view : {
    center : proj.transform([2.33, 48.86], "EPSG:4326", "EPSG:3857"),
    zoom : 4,
    rotation : 0,
    projection : "EPSG:3857"
  }
}
