import React from "react"
import PropTypes from "prop-types"
import createTable from "../"
import api from "./api"
import Button from "../../../Button"
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table"

class Table extends React.Component {

  constructor(props) {

    super(props)

    this.renderButton = this.renderButton.bind(this)
  }

  renderButton(cell, row) {

    const { truncList } = this.props
    const { id } = row

    function deleteElmt() {
      api.delete(id)
        .then(() => truncList(id))
    }

    return (
      <Button
        id={ row.id }
        onClick={ deleteElmt }
        icon="trash"
      />
    )

  }

  render() {

    return (
      <BootstrapTable { ...this.props.tableProps } height={ 500 }>
        <TableHeaderColumn isKey dataField="id">ID</TableHeaderColumn>
        <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
        <TableHeaderColumn dataFormat={ this.renderButton } width="100">Delete</TableHeaderColumn>
      </BootstrapTable>
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

export default createTable("tableWithDelete", api.find.bind(api), Table)
