/* eslint no-alert:0 */

import React from "react"
import PropTypes from "prop-types"
import createTable from "../"
import api from "./api"
import Button from "../../../Button"
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table"

class Table extends React.Component {

  constructor(props) {

    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {

    const { resetList } = this.props

    const name = prompt("Nouveau nom")

    api.create({ name })
      .then(() => resetList())
  }

  render() {

    return (
      <div>
        <Button onClick={ this.handleClick } icon="plus">Ajouter un élément</Button>
        <br/>
        <br/>
        <BootstrapTable { ...this.props.tableProps } height={ 500 }>
          <TableHeaderColumn isKey dataField="id">ID</TableHeaderColumn>
          <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }

}

Table.propTypes = {
  tableProps : PropTypes.object,
  count : PropTypes.number,
  items : PropTypes.array,
  truncList : PropTypes.func,
  resetList : PropTypes.func,
  setFilter : PropTypes.func
}

export default createTable("tableWithAdd", api.find.bind(api), Table)
