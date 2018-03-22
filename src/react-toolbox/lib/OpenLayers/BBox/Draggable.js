import Pointer from "ol/interaction/pointer"
import Events from "jsyg-events"

export default class Draggable extends Pointer {

  constructor(features) {

    super({
      handleDownEvent : Draggable.prototype.handleDownEvent,
      handleDragEvent : Draggable.prototype.handleDragEvent,
      handleMoveEvent : Draggable.prototype.handleMoveEvent,
      handleUpEvent : Draggable.prototype.handleUpEvent
    })

    this._features = features
    this._coordinate = null
    this._feature = null
    this._previousCursor = null

    this.on = Events.prototype.on
    this.off = Events.prototype.off
    this.trigger = Events.prototype.trigger
    this.ondragstart = null
    this.ondrag = null
    this.ondragend = null
  }

  getFeature(e) {

    return e.map.forEachFeatureAtPixel(e.pixel, feat => {
      return this._features.includes(feat) ? feat : null
    })
  }

  handleDownEvent(e) {

    const feature = this.getFeature(e)

    if (feature) {
      this._coordinate = e.coordinate
      this._feature = feature
      this.trigger("dragstart", this, e)
    }

    return Boolean(feature)
  }

  handleDragTopLeft(deltaX, deltaY) {

    this._features.forEach(feature => {

      const geom = feature.getGeometry()

      switch (feature.get("name")) {

      case "topLeft" : geom.translate(deltaX, deltaY); break
      case "topMiddle" : geom.translate(deltaX / 2, deltaY); break
      case "topRight" : geom.translate(0, deltaY); break
      case "middleLeft" : geom.translate(deltaX, deltaY / 2); break
      case "middleRight" : geom.translate(0, deltaY / 2); break
      case "bottomLeft" : geom.translate(deltaX, 0); break
      case "bottomMiddle" : geom.translate(deltaX / 2, 0); break
      case "bottomRight" : break
      case "rectangle" : {

        const bbox = geom.getCoordinates()[0]

        bbox[0][0] += deltaX
        bbox[2][1] += deltaY
        bbox[3][0] += deltaX
        bbox[3][1] += deltaY
        bbox[4][0] += deltaX

        geom.setCoordinates([bbox])

        break
      }

      default : throw new Error("unknown feature")

      }
    })
  }

  handleDragTopMiddle(deltaX, deltaY) {

    this._features.forEach(feature => {

      const geom = feature.getGeometry()

      switch (feature.get("name")) {

      case "topLeft" : geom.translate(0, deltaY); break
      case "topMiddle" : geom.translate(0, deltaY); break
      case "topRight" : geom.translate(0, deltaY); break
      case "middleLeft" : geom.translate(0, deltaY / 2); break
      case "middleRight" : geom.translate(0, deltaY / 2); break
      case "bottomLeft" : break
      case "bottomMiddle" : break
      case "bottomRight" : break
      case "rectangle" : {

        const bbox = geom.getCoordinates()[0]

        bbox[2][1] += deltaY
        bbox[3][1] += deltaY

        geom.setCoordinates([bbox])

        break
      }

      default : throw new Error("unknown feature")

      }
    })
  }

  handleDragTopRight(deltaX, deltaY) {

    this._features.forEach(feature => {

      const geom = feature.getGeometry()

      switch (feature.get("name")) {

      case "topLeft" : geom.translate(0, deltaY); break
      case "topMiddle" : geom.translate(deltaX / 2, deltaY); break
      case "topRight" : geom.translate(deltaX, deltaY); break
      case "middleLeft" : geom.translate(0, deltaY / 2); break
      case "middleRight" : geom.translate(deltaX, deltaY / 2); break
      case "bottomLeft" : break
      case "bottomMiddle" : geom.translate(deltaX / 2, 0); break
      case "bottomRight" : geom.translate(deltaX, 0); break
      case "rectangle" : {

        const bbox = geom.getCoordinates()[0]

        bbox[1][0] += deltaX
        bbox[2][0] += deltaX
        bbox[2][1] += deltaY
        bbox[3][1] += deltaY

        geom.setCoordinates([bbox])

        break
      }

      default : throw new Error("unknown feature")

      }
    })
  }

  handleDragMiddleLeft(deltaX) {

    this._features.forEach(feature => {

      const geom = feature.getGeometry()

      switch (feature.get("name")) {

      case "topLeft" : geom.translate(deltaX, 0); break
      case "topMiddle" : geom.translate(deltaX / 2, 0); break
      case "topRight" : break
      case "middleLeft" : geom.translate(deltaX, 0); break
      case "middleRight" : break
      case "bottomLeft" : geom.translate(deltaX, 0); break
      case "bottomMiddle" : geom.translate(deltaX / 2, 0); break
      case "bottomRight" : break
      case "rectangle" : {

        const bbox = geom.getCoordinates()[0]

        bbox[0][0] += deltaX
        bbox[3][0] += deltaX
        bbox[4][0] += deltaX

        geom.setCoordinates([bbox])

        break
      }

      default : throw new Error("unknown feature")

      }
    })
  }

  handleDragMiddleRight(deltaX) {

    this._features.forEach(feature => {

      const geom = feature.getGeometry()

      switch (feature.get("name")) {

      case "topLeft" : break
      case "topMiddle" : geom.translate(deltaX / 2, 0); break
      case "topRight" : geom.translate(deltaX, 0); break
      case "middleLeft" : break
      case "middleRight" : geom.translate(deltaX, 0); break
      case "bottomLeft" : break
      case "bottomMiddle" : geom.translate(deltaX / 2, 0); break
      case "bottomRight" : geom.translate(deltaX, 0); break
      case "rectangle" : {

        const bbox = geom.getCoordinates()[0]

        bbox[1][0] += deltaX
        bbox[2][0] += deltaX

        geom.setCoordinates([bbox])

        break
      }

      default : throw new Error("unknown feature")

      }
    })
  }

  handleDragBottomLeft(deltaX, deltaY) {

    this._features.forEach(feature => {

      const geom = feature.getGeometry()

      switch (feature.get("name")) {

      case "topLeft" : geom.translate(deltaX, 0); break
      case "topMiddle" : geom.translate(deltaX / 2, 0); break
      case "topRight" : break
      case "middleLeft" : geom.translate(deltaX, deltaY / 2); break
      case "middleRight" : geom.translate(0, deltaY / 2); break
      case "bottomLeft" : geom.translate(deltaX, deltaY); break
      case "bottomMiddle" : geom.translate(deltaX / 2, deltaY); break
      case "bottomRight" : geom.translate(0, deltaY); break
      case "rectangle" : {

        const bbox = geom.getCoordinates()[0]

        bbox[0][0] += deltaX
        bbox[0][1] += deltaY
        bbox[1][1] += deltaY
        bbox[3][0] += deltaX
        bbox[4][0] += deltaX
        bbox[4][1] += deltaY

        geom.setCoordinates([bbox])

        break
      }

      default : throw new Error("unknown feature")

      }
    })
  }

  handleDragBottomMiddle(deltaX, deltaY) {

    this._features.forEach(feature => {

      const geom = feature.getGeometry()

      switch (feature.get("name")) {

      case "topLeft" : break
      case "topMiddle" : break
      case "topRight" : break
      case "middleLeft" : geom.translate(0, deltaY / 2); break
      case "middleRight" : geom.translate(0, deltaY / 2); break
      case "bottomLeft" : geom.translate(0, deltaY); break
      case "bottomMiddle" : geom.translate(0, deltaY); break
      case "bottomRight" : geom.translate(0, deltaY); break
      case "rectangle" : {

        const bbox = geom.getCoordinates()[0]

        bbox[0][1] += deltaY
        bbox[1][1] += deltaY
        bbox[4][1] += deltaY

        geom.setCoordinates([bbox])

        break
      }

      default : throw new Error("unknown feature")

      }
    })
  }

  handleDragBottomRight(deltaX, deltaY) {

    this._features.forEach(feature => {

      const geom = feature.getGeometry()

      switch (feature.get("name")) {

      case "topLeft" : break
      case "topMiddle" : geom.translate(deltaX / 2, 0); break
      case "topRight" : geom.translate(deltaX, 0); break
      case "middleLeft" : geom.translate(0, deltaY / 2); break
      case "middleRight" : geom.translate(deltaX, deltaY / 2); break
      case "bottomLeft" : geom.translate(0, deltaY); break
      case "bottomMiddle" : geom.translate(deltaX / 2, deltaY); break
      case "bottomRight" : geom.translate(deltaX, deltaY); break
      case "rectangle" : {

        const bbox = geom.getCoordinates()[0]

        bbox[0][1] += deltaY
        bbox[4][1] += deltaY
        bbox[1][0] += deltaX
        bbox[1][1] += deltaY
        bbox[2][0] += deltaX

        geom.setCoordinates([bbox])

        break
      }

      default : throw new Error("unknown feature")

      }
    })
  }

  handleDragRectangle(deltaX, deltaY) {

    this._features.forEach(f => f.getGeometry().translate(deltaX, deltaY))
  }

  handleDragEvent(e) {

    if (!this._feature) return

    const deltaX = e.coordinate[0] - this._coordinate[0]
    const deltaY = e.coordinate[1] - this._coordinate[1]

    this._coordinate[0] = e.coordinate[0]
    this._coordinate[1] = e.coordinate[1]

    const name = this._feature.get("name")
    const method = "handleDrag" + name.charAt(0).toUpperCase() + name.slice(1)

    if (this[method]) this[method](deltaX, deltaY)

    this.trigger("drag", this, e)
  }

  handleMoveEvent(e) {

    const feature = this.getFeature(e)

    const element = e.map.getTargetElement()

    if (feature) {

      if (element.style.cursor !== this._cursor) {

        let cursor

        switch (feature.get("name")) {

        case "topLeft" : case "bottomRight" : cursor = "nwse-resize"; break
        case "topRight" : case "bottomLeft" : cursor = "nesw-resize"; break
        case "topMiddle" : case "bottomMiddle" : cursor = "ns-resize"; break
        case "middleLeft" : case "middleRight" : cursor = "ew-resize"; break
        case "rectangle" : cursor = "move"; break
        default : break

        }

        this._previousCursor = element.style.cursor
        element.style.cursor = cursor

      }

    } else if (this._previousCursor !== undefined) {
      element.style.cursor = this._previousCursor
      this._previousCursor = null
    }

  }

  handleUpEvent(e) {

    this._coordinate = null
    this._feature = null

    this.trigger("dragend", this, e)

    return false
  }

}
