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

import NewOrder from './Modal/Order/NewOrder'
import MoreDetails from './Popover/Order/MoreDetails'

require('dotenv/config');


class OrderContent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      orders: [],
      toggleRefreshOrder: false,
      orderURL: 'http://127.0.0.1:8000/api/orders',
      newOrderModal: false,


    }
  }



  orderList() {
    axios.get(this.state.orderURL, {
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
    let ord = this.state.orders.map((c) => {
      return (
        <TableRow key={(c.id)}>
          <TableCell>{(c.order_id)}</TableCell>
          <TableCell>{(c.order_date)}</TableCell>
          <TableCell>{(c.initial_estimated_arrival_date)}</TableCell>
          <TableCell><MoreDetails order_id={c.order_id} weight={c.weight}/></TableCell>
        </TableRow>
      )
    });


    return (
      <Paper>
        <AppBar position="static" color="default" elevation={0}>
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <SearchIcon className={this.state.classesblock} color="inherit" />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  placeholder="Search by orderID"
                  InputProps={{
                    disableUnderline: true,
                    className: this.state.classessearchInput,
                  }}
                  onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                      // Do code here
                      ev.preventDefault();
                      console.log(`Pressed keyCode ${ev.key}`);
                    }
                  }}
                />
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" onClick={this.newOrderVisible.bind(this)}>
                  Add Order
                </Button>

                <NewOrder modalVisible={this.state.newOrderModal}
                  newOrderVisible={this.newOrderVisible.bind(this)}
                  step={1} />


                <Tooltip title="Reload">
                  <IconButton onClick={this.orderList.bind(this)}>
                    <RefreshIcon className={this.state.classesblock} color="inherit" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {/* <div className={this.state.classescontentWrapper}> */}
        <div>
          <Typography>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow key={'table-title'}>
                  <TableCell>ID</TableCell>
                  <TableCell>Order Date</TableCell>
                  <TableCell>Estimate Arrival Time</TableCell>
                  <TableCell>More Details</TableCell>
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


export default OrderContent;