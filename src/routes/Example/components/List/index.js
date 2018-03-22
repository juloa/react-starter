import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table"
import { FormattedMessage as Text } from "react-intl"
import messages from "../../messages"
import { Label, Panel } from "react-bootstrap"
import AffixBar from "react-toolbox/lib/AffixBar"
import Button from "react-toolbox/lib/Button"
import Search from "react-toolbox/lib/Search"
import ConfirmWrap from "react-toolbox/lib/ConfirmWrap"
import { createTable } from "react-toolbox/lib/HOC"
import classNames from "./style.module.css"

import {withRouter} from "react-router-dom";

import { api, actions } from "../../actions"

export class List extends Component {

  constructor(props) {

    super(props)

    this.viewItem = this.viewItem.bind(this)
    this.renderButtons = this.renderButtons.bind(this)
    this.handleChangeFilter = this.handleChangeFilter.bind(this)
    this.handleClickNew = this.handleClickNew.bind(this)
  }

  renderButtons(cell, row) {

    const { dispatch, truncList,history } = this.props

    function deleteElmt() {
      dispatch(actions.deleteItem(row.id))
      .then(() => truncList(row.id))
    }

    function editItem() {
      history.push("/examples/" + row.id + "/edit")
    }

    return (
      <div className={ classNames.show }>
        <Button
          id={ row.id }
          bsStyle="primary"
          onClick={ editItem }
          icon="pencil"
          label={ messages.editExample }
          compact
        />
        &nbsp;
        <ConfirmWrap message={ messages.confirmDeleteExample }>
          <Button
            id={ row.id }
            bsStyle="danger"
            onClick={ deleteElmt }
            icon="trash"
            compact
            label={ messages.deleteExample }
          />
        </ConfirmWrap>
      </div>
    )

  }

  viewItem(cell) {
    this.props.history.push("/examples/" + cell.id)
  }

  handleChangeFilter(value) {

    this.props.setFilter("name", value)
  }

  handleClickNew() {
    this.props.history.push("/examples/new");
  }

  render() {

    const { className, count, tableProps, ...rest } = this.props

    delete rest.dispatch
    delete rest.truncList
    delete rest.resetList
    delete rest.items
    delete rest.triggerPoint
    delete rest.setFilter
    delete rest.staticContext

    const options = { onRowDoubleClick : this.viewItem }

    return (
      <Panel { ...rest } className={ classNames.container + (className ? " " + className : "") }>

        <AffixBar className={ classNames.affixBar }>
          <Button
            bsStyle="primary"
            icon="plus"
            label={ messages.newExample }
            onClick={ this.handleClickNew }
          />
          <Search className={ classNames.marginLeft } onChange={ this.handleChangeFilter }/>
          { count !== null && (
            <Label className={ classNames.count }>
              <Text { ...messages.count } values={ { count } }/>
            </Label>
          ) }
        </AffixBar>

        <BootstrapTable
          { ...tableProps }
          options={ { ...tableProps.options, ...options } }
          trClassName={ classNames.tr }
        >
          <TableHeaderColumn isKey dataField="name">
            <Text { ...messages.name }/>
          </TableHeaderColumn>
          <TableHeaderColumn dataFormat={ this.renderButtons } width="100">
            <Text { ...messages.actions }/>
          </TableHeaderColumn>
        </BootstrapTable>
      </Panel>
    )

  }

}

List.propTypes = {
  items : PropTypes.array,
  dispatch : PropTypes.func,
  fetchError : PropTypes.string,
  isFetching : PropTypes.bool,
  className : PropTypes.string,
  count : PropTypes.number,
  setFilter : PropTypes.func,
  truncList : PropTypes.func,
  tableProps : PropTypes.object
}

export default withRouter(createTable("examples/list", api.find.bind(api), connect()(List)))
