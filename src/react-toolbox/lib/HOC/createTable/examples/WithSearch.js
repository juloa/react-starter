/* eslint no-alert:0 */

import React from "react"
import PropTypes from "prop-types"
import createTable from "../"
import api from "./api"
import Search from "../../../Search"
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table"

class Table extends React.Component {

  constructor(props) {

    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {

    this.props.setFilter("name", value)
  }

  render() {

    return (
      <div>
        <Search onChange={ this.handleChange } icon="plus"/>
        <br/>
        <br/>
        <BootstrapTable { ...this.props.tableProps } height={ 500 } >
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

export default createTable("tableWithSearch", api.find.bind(api), Table)
