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


class OrderNonTransitContent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      orders: [],
      toggleRefreshOrder: false,
      orderURL: 'http://127.0.0.1:8000/api/orders/waiting',
      newOrderModal: false,


    }
  }



  orderList() {
    axios.get(this.state.orderURL,{
      'headers': {
          'Authorization': sessionStorage.getItem('Authorization')
      }
    }).then((response) => {
      // console.log(response)
      this.setState({
        orders: response.data
      })
    });
  }

  componentDidMount() {
    this.orderList();
    // console.log(this.state.orders)
  }

  newOrderVisible() {
    this.setState({
      newOrderModal: !this.state.newOrderModal
    });
  }

  render() {
    let ord = this.state.orders.map((c) => {
      return (
        <TableRow key={(c.id)}>
          <TableCell>{(c.order_id)}</TableCell>
          <TableCell>{(c.order_date)}</TableCell>
          <TableCell>{(c.initial_estimated_arrival_date)}</TableCell>
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
                  <TableCell>ID</TableCell>
                  <TableCell>Order Date</TableCell>
                  <TableCell>Estimate Arrival Time</TableCell>
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


export default OrderNonTransitContent;