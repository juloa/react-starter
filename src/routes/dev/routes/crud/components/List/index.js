import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { push } from "react-router-redux"
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table"
import { FormattedMessage as Text } from "react-intl"
import messages from "../../messages"
import { Label } from "react-bootstrap"
import AffixBar from "components/AffixBar"
import Button from "components/Button"
import Search from "components/Search"
import ConfirmWrap from "components/ConfirmWrap"
import { createTable } from "components/HOC"
import { api, deleteItem } from "../../actions"
import classNames from "./style.module.css"

export class List extends Component {

  constructor(props) {

    super(props)

    this.viewItem = this.viewItem.bind(this)
    this.renderButtons = this.renderButtons.bind(this)
    this.handleChangeFilter = this.handleChangeFilter.bind(this)
    this.handleClickNew = this.handleClickNew.bind(this)
  }

  renderButtons(cell, row) {

    const { dispatch, truncList } = this.props

    function deleteElmt() {
      dispatch(deleteItem(row.id))
      .then(() => truncList(row.id))
    }

    function editItem() {
      dispatch(push("dev/crud/" + row.id + "/edit"))
    }

    return (
      <div className={ classNames.show }>
        <Button
          id={ row.id }
          bsStyle="primary"
          onClick={ editItem }
          icon="pencil"
          label={ messages.editItem }
          compact
        />
        &nbsp;
        <ConfirmWrap message={ messages.confirmDeleteItem }>
          <Button
            id={ row.id }
            bsStyle="danger"
            onClick={ deleteElmt }
            icon="trash"
            compact
            label={ messages.deleteItem }
          />
        </ConfirmWrap>
      </div>
    )

  }

  viewItem(cell) {

    this.props.dispatch(push("dev/crud/" + cell.id))
  }

  handleChangeFilter(value) {

    this.props.setFilter("name", value)
  }

  handleClickNew() {

    this.props.dispatch(push("dev/crud/new"))
  }

  render() {

    const { className, count, tableProps, ...rest } = this.props

    delete rest.dispatch
    delete rest.truncList
    delete rest.resetList
    delete rest.items
    delete rest.triggerPoint
    delete rest.setFilter

    const options = { onRowDoubleClick : this.viewItem }

    return (
      <div { ...rest } className={ classNames.container + (className ? " " + className : "") }>

        <AffixBar className={ classNames.affixBar }>
          <Button
            bsStyle="primary"
            icon="plus"
            label={ messages.newItem }
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
          <TableHeaderColumn isKey dataField="id">
            <Text { ...messages.id }/>
          </TableHeaderColumn>
          <TableHeaderColumn dataField="name">
            <Text { ...messages.name }/>
          </TableHeaderColumn>
          <TableHeaderColumn dataFormat={ this.renderButtons } width="100">
            <Text { ...messages.actions }/>
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
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

export default createTable("dev/crud/list", api.find.bind(api), connect()(List))
