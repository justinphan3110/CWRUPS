import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

import TableBody from '@material-ui/core/TableBody'
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';

import React, { Component } from 'react';
import axios from 'axios';

require('dotenv/config');


class CustomerSingleTypeContent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      customers: [],
      toggleRefreshOrder: false,
      orderURL: 'http://127.0.0.1:8000/api/customers/single-type',
      newOrderModal: false,


    }
  }



  orderList() {
    axios.get(this.state.orderURL).then((response) => {
      // console.log(response.data)
      this.setState({
        customers: response.data
      })
    });
  }

  componentDidMount() {
    console.log(this.state.orderURL)
    this.orderList();
    // console.log(this.state.orders)
  }

  newOrderVisible() {
    this.setState({
      newOrderModal: !this.state.newOrderModal
    });
  }

  render() {
    let ord = this.state.customers.map((c) => {
      return (
        <TableRow key={(c.id)}>
          <TableCell>{(c.customer_id)}</TableCell>
          <TableCell>{(c.first_name)}</TableCell>
          <TableCell>{(c.last_name)}</TableCell>
          <TableCell>{(c.parcel_type.type_id)}</TableCell>
          <TableCell>{(c.parcel_type.type_description)}</TableCell>
        </TableRow>
      )
    });


    return (
      <Paper>
        {/* <div className={this.state.classescontentWrapper}> */}
        <div>
          <Typography>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow key={'table-title'}>
                  <TableCell>Customer ID</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Parcel Type ID</TableCell>
                  <TableCell>Parcel Type Description</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {ord}
              </TableBody>

            </Table>
          </Typography>
          {/* </div> */}
        </div>
      </Paper>
    );
  }
}


export default CustomerSingleTypeContent;