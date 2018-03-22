/* eslint newline-before-return:0 max-statements:0*/
import Draw from "ol/interaction/draw"
import VectorSource from "ol/source/vector"
import VectorLayer from "ol/layer/vector"
import Point from "ol/geom/point"
import Polygon from "ol/geom/polygon"
import Feature from "ol/feature"
import Draggable from "./Draggable"
import Style from "ol/style/style"
import Fill from "ol/style/fill"
import Stroke from "ol/style/stroke"
import Icon from "ol/style/icon"
import iconSrc from "./dragHandle.svg"

/*
const iconSvg = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
  <circle cx="8" cy="8" r="7" fill="rgb(50,50,255)" stroke-width="0"/>
</svg>`

const parser = new DOMParser()
const doc = parser.parseFromString(iconSvg, "image/svg+xml")
const node = doc.documentElement

const iconSrc = "data:image/svg+xml;base64," + btoa( unescape( encodeURIComponent(iconSvg) ) )
*/

export default class BBox extends VectorLayer {

  constructor({ ...opt }) {

    super({
      source : new VectorSource({
        wrapX : false
      })
    })

    this.bbox = null
    this.color = [50, 50, 255]
    this._editable = false

    if (opt.onChange) this.onChange = opt.onChange

    if (opt.map) this.setMap(opt.map)

    if (opt.bbox) this.createBBox(opt.bbox)

    if (opt.map && opt.editable) this.editable = opt.editable
  }

  setMap(map) {

    this.map = map
  }

  addCircle(coords, name) {

    const source = this.getSource()

    const feature = new Feature({
      geometry : new Point(coords),
      name
    })

    feature.setStyle(new Style({
      image : new Icon({ src : iconSrc })
    }))

    source.addFeature(feature)
  }

  getBBox() {

    return this.bbox && this.bbox.getGeometry().getExtent()
  }

  handleChange(e) {

    if (this.onChange) this.onChange(this.getBBox(), e)
  }

  setBBoxName(feature) {

    feature.set("name", "rectangle")
  }


  createBBox(bounds) {

    if (bounds.length !== 4) {
      this.deleteBBox()
      return
    }

    if (this.bbox) this.deleteBBox()

    const feature = new Feature({
      geometry : new Polygon(this.boundsToPolygon(bounds))
    })

    this.setBBoxName(feature)

    this.getSource().addFeature(feature)

    this._displayBBox(feature)
  }

  updateBBox(bounds) {

    if (bounds.length !== 4) {
      this.deleteBBox()
      return
    }

    if (!this.bbox) {
      this.createBBox(bounds)
      return
    }

    this.bbox.getGeometry().setCoordinates( this.boundsToPolygon(bounds) )

    if (this.editable) {

      this.getSource().getFeatures().forEach(feature => {

        const geom = feature.getGeometry()

        switch (feature.get("name")) {

        case "bottomLeft" : geom.setCoordinates([bounds[0], bounds[1]]); break
        case "bottomMiddle" : geom.setCoordinates([(bounds[0] + bounds[2]) / 2, bounds[1]]); break
        case "bottomRight" : geom.setCoordinates([bounds[2], bounds[1]]); break
        case "topLeft" : geom.setCoordinates([bounds[0], bounds[3]]); break
        case "topMiddle" : geom.setCoordinates([(bounds[0] + bounds[2]) / 2, bounds[3]]); break
        case "topRight" : geom.setCoordinates([bounds[2], bounds[3]]); break
        case "middleLeft" : geom.setCoordinates([bounds[0], (bounds[1] + bounds[3]) / 2]); break
        case "middleRight" : geom.setCoordinates([bounds[2], (bounds[1] + bounds[3]) / 2]); break
        default : break

        }
      })
    }
  }

  boundsToPolygon(bounds) {

    const bottomLeft = [bounds[0], bounds[1]]
    const bottomRight = [bounds[2], bounds[1]]
    const topRight = [bounds[2], bounds[3]]
    const topLeft = [bounds[0], bounds[3]]

    return [ [bottomLeft, bottomRight, topRight, topLeft, bottomLeft] ]
  }

  addInteractions() {

    const bounds = this.getBBox()

    this.addCircle([bounds[0], bounds[3]], "topLeft")
    this.addCircle([(bounds[0] + bounds[2]) / 2, bounds[3]], "topMiddle")
    this.addCircle([bounds[2], bounds[3]], "topRight")
    this.addCircle([bounds[0], bounds[1]], "bottomLeft")
    this.addCircle([(bounds[0] + bounds[2]) / 2, bounds[1]], "bottomMiddle")
    this.addCircle([bounds[2], bounds[1]], "bottomRight")
    this.addCircle([bounds[0], (bounds[1] + bounds[3]) / 2], "middleLeft")
    this.addCircle([bounds[2], (bounds[1] + bounds[3]) / 2], "middleRight")

    const features = this.getSource().getFeatures()

    if (!features.includes(this.bbox)) features.push(this.bbox)

    this.drag = new Draggable(features)
    this.drag.on("drag", e => this.handleChange(e))
    this.map.addInteraction(this.drag)
  }

  removeInteractions() {

    this.map.removeInteraction(this.drag)
  }

  _displayBBox(feature) {

    this.setBBoxName(feature)

    this.bbox = feature

    this.bbox.setStyle(new Style({
      stroke : new Stroke({
        color : "rgb(" + this.color + ")"
      }),
      fill : new Fill({
        color : "rgba(" + this.color + ",0.2)"
      })
    }))

    if (this.editable) this.addInteractions()

    if (this.draw) {
      this.map.removeInteraction(this.draw)
      this.draw = null
    }
  }

  initDraw() {

    this.removeInteractions()

    const source = this.getSource()

    const draw = new Draw({
      source,
      type : "Circle",
      geometryFunction : Draw.createBox()
    })

    if (this.onChange) draw.on("draw", e => this.handleChange(e))

    draw.on("drawend", e => {
      this._displayBBox(e.feature)
      this.handleChange(e)
    })

    this.draw = draw
    this.map.addInteraction(this.draw)
  }

  deleteBBox() {

    const { editable } = this

    this.editable = false
    this.getSource().clear()

    this.bbox = null

    if (editable) this.editable = true
  }

  get editable() {

    return this._editable
  }

  set editable(value) {

    const { editable } = this

    if (value) {

      if (this.bbox) {
        if (!editable) this.addInteractions()
      } else this.initDraw()

      this._editable = true

    } else {

      if (editable) this.removeInteractions()
      this._editable = false
    }
  }

}
