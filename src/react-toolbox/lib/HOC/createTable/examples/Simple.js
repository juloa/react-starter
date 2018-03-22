import React from "react"
import PropTypes from "prop-types"
import createTable from "../"
import api from "./api"
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table"

const Table = ({ tableProps }) => (
  <BootstrapTable { ...tableProps }>
    <TableHeaderColumn isKey dataField="id">ID</TableHeaderColumn>
    <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
  </BootstrapTable>
)

Table.propTypes = {
  tableProps : PropTypes.object,
  count : PropTypes.number,
  items : PropTypes.array,
  truncList : PropTypes.func,
  resetList : PropTypes.func,
  setFilter : PropTypes.func
}

export default createTable("tableSimple", api.find.bind(api), Table)
