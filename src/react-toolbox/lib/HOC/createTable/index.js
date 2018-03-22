/* eslint max-statements:0 */
import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Spinner from "react-toolbox/lib/Spinner"
import { Alert } from "react-bootstrap"
import _ from "lodash"

import classNames from "./style.module.css"

import { logout } from "restAPI/Auth/ducks"
import { injectReducers } from "store"
import { fromJS } from "immutable"

const debounce = _.debounce

export default function createTable(STATE_PROPERTY, fetchFunc, Component) {

  const FETCH_REQUEST = STATE_PROPERTY + "/FETCH_REQUEST"
  const FETCH_SUCCESS = STATE_PROPERTY + "/FETCH_SUCCESS"
  const FETCH_ERROR = STATE_PROPERTY + "/FETCH_ERROR"
  const SET_LIST = STATE_PROPERTY + "/SET_LIST"
  const RESET_LIST = STATE_PROPERTY + "/RESET_LIST"
  const SET_CURRENT_PAGE = STATE_PROPERTY + "/SET_CURRENT_PAGE"
  const SET_LAST_SCROLL = STATE_PROPERTY + "/SET_CURRENT_SCROLL"
  const SET_FILTER = STATE_PROPERTY + "/SET_FILTER"

  const setFilter = filter => ({ type : SET_FILTER, filter })

  const setCurrentPage = page => ({ type : SET_CURRENT_PAGE, page })

  const setLastScroll = scroll => ({ type : SET_LAST_SCROLL, scroll })

  const resetList = () => ({ type : RESET_LIST })

  /* Cette action permet à la fois de :
  - conserver les pages qui précèdent l'enregistrement précisé,
  - mettre à jour la page qui contient cet enregistrement,
  - supprimer les pages suivantes (car elles sont potentiellement décalées en cas de suppression de l'enregistrement) */
  const truncList = id => (dispatch, getState) => {

    const state = getState()[STATE_PROPERTY]
    const list = state.get("list").toJS()
    const nbResults = state.get("nbResults")
    const index = list.findIndex(item => item.id === id)
    const page = Math.floor(index / nbResults) + 1

    dispatch({
      type : SET_LIST,
      list : list.slice(0, nbResults * (page - 1))
    })

    dispatch(setCurrentPage(page))

    return dispatch(getItems())

  }

  const getItems = () => (dispatch, getState) => {

    const state = getState()[STATE_PROPERTY]
    const page = state.get("currentPage")
    const filter = state.get("filter").toJS()

    dispatch({ type : FETCH_REQUEST })

    return fetchFunc({ ...filter, page })
      .then(res => {

        dispatch({
          type : FETCH_SUCCESS,
          list : res.results,
          count : res.count
        })

      })
      .catch(e => {

        if (e.status === 403) dispatch(logout())

        let errorMessage

        try {
          errorMessage = JSON.parse(e.content).detail
        } catch (err) {
          errorMessage = err.content
        }

        dispatch({ type : FETCH_ERROR, error : errorMessage })

        throw new Error(errorMessage)

      })

  }


  const initialState = fromJS({
    list : [],
    isFetching : false,
    fetchError : null,
    nbResults : 20,
    currentPage : 0,
    lastScroll : null,
    count : null,
    filter : {}
  })

  function reducer(state = initialState, action) {

    switch (action.type) {

    case RESET_LIST :

      return state.merge({
        list : fromJS([]),
        isFetching : false,
        fetchError : null,
        currentPage : 0,
        count : null
      })

    case SET_FILTER :

      return state.mergeIn(["filter"], action.filter)

    case SET_CURRENT_PAGE :

      return state.set("currentPage", action.page)

    case SET_LAST_SCROLL :

      return state.set("lastScroll", action.scroll)

    case SET_LIST :

      return state.set("list", fromJS(action.list))

    case FETCH_REQUEST :

      return state
        .merge({
          isFetching : true,
          fetchError : null
        })

    case FETCH_SUCCESS :

      return state
        .merge({
          isFetching : false,
          fetchError : null,
          list : state.get("list").concat(fromJS(action.list)),
          count : action.count
        })

    case FETCH_ERROR :

      return state
        .merge({
          isFetching : false,
          fetchError : action.error
        })

    default :

      return state

    }

  }

  injectReducers({ [STATE_PROPERTY] : reducer })

  class List extends React.Component {

    constructor(props) {

      super(props)

      this.getItemsIfNeeded = this.getItemsIfNeeded.bind(this)
      this.getItemsAndScrollIfNeeded = this.getItemsAndScrollIfNeeded.bind(this)
      this.addItems = this.addItems.bind(this)
      this.truncList = this.truncList.bind(this)
      this.resetList = this.resetList.bind(this)


      this.setFilterDebounced = debounce(this._setFilter.bind(this), 300)

      this.setFilter = (key, value, debounced) => {

        if (debounced) return this._setFilterDebounced(key, value)
        else return this._setFilter(key, value)

      }

      this.mounted = false

    }

    addItems(page) {

      const { items, count, isFetching, dispatch } = this.props

      if (isFetching || (count !== null && items.length >= count)) return Promise.reject()

      dispatch(setCurrentPage(page))

      return dispatch(getItems())

    }

    getDistanceToBottom() {

      const table = this.bodyTable

      if (this.isFixedHeight()) {

        return table.scrollHeight - table.scrollTop - table.clientHeight

      } else {

        return document.documentElement.scrollHeight - window.innerHeight - window.scrollY
      }

    }

    isFixedHeight() {

      if (!this.bodyTable) throw new Error("bodyTable is null")

      const { height } = this.bodyTable.style

      return height && height !== "100%"
    }

    getItemsIfNeeded() {

      const { currentPage, triggerPoint } = this.props

      if (this.getDistanceToBottom() < triggerPoint) {

        return this.addItems(currentPage + 1)
          .then(this.getItemsIfNeeded)
          .catch(e => e)

      } else return Promise.resolve()

    }

    hasEnoughHeight() {

      const { lastScroll } = this.props

      const fixedHeight = this.isFixedHeight()

      if (fixedHeight) {

        const table = this.bodyTable

        return table && table.scrollHeight > lastScroll + table.clientHeight

      } else {

        return document.body.clientHeight > lastScroll + window.innerHeight
      }

    }

    getItemsAndScrollIfNeeded() {

      const { count, lastScroll, items, dispatch, currentPage } = this.props

      if (lastScroll !== null) {

        if (this.hasEnoughHeight()) {

          if (this.isFixedHeight()) this.bodyTable.scrollTop = lastScroll
          else window.scrollTo(0, lastScroll)

          return Promise.resolve()

        } else {

          return this.addItems(currentPage + 1)
            .then(this.getItemsAndScrollIfNeeded)
            .catch(e => e)
        }

      } else if (count === null || items.length === 0) {

        dispatch(setCurrentPage(1))

        return this.getItemsIfNeeded()

      } else return Promise.resolve()

    }

    setBodyTable() {

      const bodyTable = ReactDOM.findDOMNode(this.container)

      this.bodyTable = bodyTable && bodyTable.querySelector(".react-bs-container-body")

      return this.bodyTable
    }

    componentDidMount() {

      this.mounted = true

      const table = this.setBodyTable()

      if (this.isFixedHeight()) {

        const preventScroll = function preventScroll(e) {

          const isUp = this.scrollTop === 0
          const isDown = this.scrollTop === this.scrollHeight - this.clientHeight

          if ((isUp && e.deltaY) < 0 || (isDown && e.deltaY) > 0) e.preventDefault()
        }

        table.addEventListener("scroll", this.getItemsIfNeeded)
        table.addEventListener("wheel", preventScroll)

      } else {

        window.addEventListener("scroll", this.getItemsIfNeeded)
      }

      this.getItemsAndScrollIfNeeded()
    }

    componentWillUnmount() {

      if (!this.isFixedHeight()) window.removeEventListener("scroll", this.getItemsIfNeeded)

      this.setLastScroll()
    }

    setLastScroll() {

      if (!this.mounted) return

      const scroll = this.isFixedHeight() ? this.bodyTable.scrollTop : window.scrollY

      this.props.dispatch(setLastScroll(scroll))
    }

    truncList(id) {

      this.setLastScroll()

      return this.props.dispatch(truncList(id))
        .then(this.getItemsAndScrollIfNeeded)
    }

    delay() {

      return new Promise(resolve => setTimeout(resolve, 0))
    }

    resetList() {

      if (this.mounted) this.setLastScroll()

      this.props.dispatch(resetList())

      // sans délai, le nouveau rendu n'a pas le temps d'être fait pour prendre les mesures
      return this.delay().then(() => {
        if (this.mounted) this.getItemsIfNeeded()
      })
    }

    _setFilter(key, value) {

      const { dispatch } = this.props

      dispatch(setFilter({ [key] : value }))

      return this.resetList()
    }

    render() {

      const { items, options, isFetching, fetchError, count, ...rest } = this.props

      delete rest.dispatch
      delete rest.currentPage
      delete rest.lastScroll
      delete rest.filter

      const tableProps = {
        data : items,
        options : { noDataText : "...", withoutNoDataText : true, ...options },
        hover : true,
        trClassName : classNames.tr
      }

      return (
        <div className={ classNames.container } ref={ node => this.container = node }>
          <Component
            tableProps={ tableProps }
            truncList={ this.truncList }
            resetList={ this.resetList }
            setFilter={ this.setFilter }
            count={ count }
            items={ items }
            { ...rest }
          />
          { fetchError && <Alert bsStyle="danger">{ fetchError }</Alert> }
          { isFetching ? <Spinner className={ classNames.spinner }/> : <div className={ classNames.spinner }/> }
        </div>
      )

    }

  }

  List.propTypes = {
    items : PropTypes.array,
    dispatch : PropTypes.func,
    options : PropTypes.object,
    isFetching : PropTypes.bool,
    fetchError : PropTypes.string,
    count : PropTypes.number,
    lastScroll : PropTypes.number,
    currentPage : PropTypes.number,
    triggerPoint : PropTypes.number
  }

  List.defaultProps = {
    triggerPoint : 400
  }

  List.actions = {
    truncList, resetList, setFilter, getItems
  }

  function mapStateToProps(state) {

    const dataList = state[STATE_PROPERTY]

    return {
      items : dataList.get("list").toJS(),
      isFetching : dataList.get("isFetching"),
      fetchError : dataList.get("fetchError"),
      count : dataList.get("count"),
      currentPage : dataList.get("currentPage"),
      lastScroll : dataList.get("lastScroll")
    }
  }

  return connect(mapStateToProps)(List)

}
