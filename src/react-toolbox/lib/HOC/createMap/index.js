/* eslint max-statements:0, complexity:0 */

import { fromJS } from "immutable"
import { injectReducers } from "store"
import Map from "../../OpenLayers/Map"
import { connect } from "react-redux"
import proj from "ol/proj"
import isPlainObject from "lodash.isplainobject"

function simplifyLayer(layer) {

  if (isPlainObject(layer)) return layer

  const source = layer.getSource()

  return {
    source : {
      params : source.getParams && source.getParams(),
      url : source.getUrls && source.getUrls()[0]
    },
    ...layer.getProperties()
  }
}

export default function createMap(STATE_PROPERTY) {

  const SET_MAP = STATE_PROPERTY + "/SET_MAP"

  const SET_CENTER = STATE_PROPERTY + "/SET_CENTER"
  const SET_CENTER_LAT = STATE_PROPERTY + "/SET_CENTER_LAT"
  const SET_CENTER_LON = STATE_PROPERTY + "/SET_CENTER_LON"
  const SET_ZOOM = STATE_PROPERTY + "/SET_ZOOM"
  const SET_ROTATION = STATE_PROPERTY + "/SET_ROTATION"
  const SET_PROJECTION = STATE_PROPERTY + "/SET_PROJECTION"
  const SET_SIZE = STATE_PROPERTY + "/SET_SIZE"

  const SET_INTERACTIONS = STATE_PROPERTY + "/SET_INTERACTIONS"

  const SET_LAYERS = STATE_PROPERTY + "/SET_LAYERS"
  const ADD_LAYER = STATE_PROPERTY + "/ADD_LAYER"
  const INSERT_LAYER = STATE_PROPERTY + "/INSERT_LAYER"
  const SET_LAYER = STATE_PROPERTY + "/SET_LAYER"
  const REMOVE_LAYER = STATE_PROPERTY + "/REMOVE_LAYER"

  const SET_LAYER_ATTR = STATE_PROPERTY + "/SET_LAYER_ATTR"
  const UPDATE_LAYER_ATTRS = STATE_PROPERTY + "/UPDATE_LAYER_ATTRS"

  const SET_LAYER_PARAM = STATE_PROPERTY + "/SET_LAYER_PARAM"
  const SET_LAYER_PARAMS = STATE_PROPERTY + "/SET_LAYER_PARAMS"
  const UPDATE_LAYER_PARAMS = STATE_PROPERTY + "/UPDATE_LAYER_PARAMS"

  const SET_LAYER_URL = STATE_PROPERTY + "/SET_LAYER_URL"

  const actions = {

    setMap : map => ({
      type : SET_MAP,
      map
    }),

    setCenter : ({ lon, lat }) => ({
      type : SET_CENTER,
      center : {
        lat : Number(lat),
        lon : Number(lon)
      }
    }),

    setCenterLat : lat => ({
      type : SET_CENTER_LAT,
      lat : Number(lat)
    }),

    setCenterLon : lon => ({
      type : SET_CENTER_LON,
      lon : Number(lon)
    }),

    setZoom : zoom => ({
      type : SET_ZOOM,
      zoom : Number(zoom)
    }),

    setRotation : rotation => ({
      type : SET_ROTATION,
      rotation : Number(rotation)
    }),

    setProjection : projection => ({
      type : SET_PROJECTION,
      projection
    }),

    setSize : (width, height) => ({
      type : SET_SIZE,
      width,
      height
    }),

    setInteractions : interactions => ({
      type : SET_INTERACTIONS,
      interactions
    }),

    setLayers : layers => ({
      type : SET_LAYERS,
      layers : layers.map(simplifyLayer)
    }),

    setLayer : (index, layer) => ({
      type : SET_LAYER,
      layer : simplifyLayer(layer),
      index
    }),

    insertLayer : (layer, index) => ({
      type : INSERT_LAYER,
      layer : simplifyLayer(layer),
      index
    }),

    addLayer : (layer) => ({
      type : ADD_LAYER,
      layer : simplifyLayer(layer)
    }),

    setLayerAttr : (index, attr, value) => ({
      type : SET_LAYER_ATTR,
      index,
      attr,
      value
    }),

    updateLayerAttrs : (index, attrs) => ({
      type : UPDATE_LAYER_ATTRS,
      index,
      attrs
    }),

    setLayerParam : (index, param, value) => ({
      type : SET_LAYER_PARAM,
      index,
      param,
      value
    }),

    setLayerParams : (index, params) => ({
      type : SET_LAYER_PARAMS,
      index,
      params
    }),

    updateLayerParams : (index, params) => ({
      type : UPDATE_LAYER_PARAMS,
      index,
      params
    }),

    setLayerUrl : (index, url) => ({
      type : SET_LAYER_URL,
      index,
      url
    }),

    removeLayer : index => ({
      type : REMOVE_LAYER,
      index
    })
  }

  const initialState = fromJS({
    view : {
      center : {
        lon : 2.33,
        lat : 48.86
      },
      zoom : 4,
      rotation : 0,
      projection : "EPSG:3857"
    },
    size : {
      width : null,
      height : null
    },
    layers : [],
    interactions : []
  })

  function reducer(state = initialState, action) {

    switch (action.type) {

    case SET_MAP :
      return fromJS(action.map)

    case SET_CENTER :
      return state.mergeIn(["view", "center"], action.center)

    case SET_CENTER_LAT :
      return state.setIn(["view", "center", "lat"], action.lat)

    case SET_CENTER_LON :
      return state.setIn(["view", "center", "lon"], action.lon)

    case SET_ZOOM :
      return state.setIn(["view", "zoom"], action.zoom)

    case SET_ROTATION :
      return state.setIn(["view", "rotation"], action.rotation)

    case SET_PROJECTION :
      return state.setIn(["view", "projection"], action.projection)

    case SET_SIZE :
      return state.mergeIn(["size"], { width : action.width, height : action.height })

    case SET_INTERACTIONS :
      return state.set("interactions", fromJS(action.interactions))

    case SET_LAYERS :
      return state.set("layers", fromJS(action.layers))

    case SET_LAYER :
      return state.setIn(["layers", action.index], fromJS(action.layer))

    case ADD_LAYER :
      return state.set("layers", state.get("layers").push(fromJS(action.layer)))

    case INSERT_LAYER :
      if (action.index == null) return reducer(state, { ...action, type : ADD_LAYER })
      else {
        return state.set(
          "layers",
          state.get("layers").insert(action.index, fromJS(action.layer))
        )
      }

    case SET_LAYER_ATTR :
      return state.setIn(["layers", action.index, action.attr], action.value)

    case UPDATE_LAYER_ATTRS :
      return state.mergeIn(["layers", action.index], fromJS(action.attrs))

    case SET_LAYER_PARAM :
      return state.setIn(["layers", action.index, "source", "params", action.param], action.value)

    case SET_LAYER_PARAMS :
      return state.setIn(["layers", action.index, "source", "params"], fromJS(action.params))

    case UPDATE_LAYER_PARAMS :
      return state.mergeIn(["layers", action.index, "source", "params"], fromJS(action.params))

    case SET_LAYER_URL :
      return state.setIn(["layers", action.index, "source", "url"], action.url)

    case REMOVE_LAYER :
      return state.deleteIn(["layers", action.index])

    default : return state

    }
  }

  function mapStateToProps(state, ownProps) {

    const dataStore = state[STATE_PROPERTY]

    const view = dataStore.get("view")

    const lat = view.getIn(["center", "lat"])
    const lon = view.getIn(["center", "lon"])
    const zoom = view.get("zoom")
    const rotation = view.get("rotation")
    const projection = view.get("projection")
    const layers = dataStore.get("layers").toJS()
    // const interactions = dataStore.get("interactions").toJS()
    const size = dataStore.get("size").toJS()

    return {

      view : {
        center : proj.transform([Number(lon), Number(lat)], "EPSG:4326", projection),
        zoom : Number(zoom),
        rotation : Number(rotation) * Math.PI / 180,
        projection
      },

      size,

      layers : ownProps.layers || layers/* ,

      interactions : ownProps.interactions || interactions*/
    }
  }

  function mapDispatchToProps(dispatch, ownProps) {

    return {
      onChangeView(e) {

        let value

        switch (e.key) {

        case "resolution" :
          value = e.target.getZoom()
          dispatch(actions.setZoom(value))
          break

        case "center" :
          value = proj.transform(e.target.getCenter(), e.target.getProjection(), "EPSG:4326")
          dispatch(actions.setCenter({ lon : value[0], lat : value[1] }))
          break

        case "rotation" :
          value = e.target.getRotation()
          dispatch(actions.setRotation(value * 180 / Math.PI))
          break

        case "projection" :
          value = e.target.getProjection()
          dispatch(actions.setProjection(value))
          break

        default :

        }

        if (ownProps.onChangeView) ownProps.onChangeView(e)
      },

      onChangeSize(size) {

        dispatch(actions.setSize(size[0], size[1]))

        if (ownProps.onChangeSize) ownProps.onChangeSize(size)
      }
    }
  }

  injectReducers({ [STATE_PROPERTY] : reducer })

  const Container = connect(mapStateToProps, mapDispatchToProps)(Map)

  Container.actions = actions

  Container.simplifyLayer = simplifyLayer

  return Container

}
