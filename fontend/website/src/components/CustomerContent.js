import React, { Component } from 'react'
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
import axios from 'axios';


import NewCustomer from './Modal/Customer/NewCustomer'
import AllOrders from './Popover/Customer/AllOrders'


require('dotenv/config');

export default class CustomerContent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      customers: [],
      toggleRefreshCustomer: false,
      customerURL: 'http://127.0.0.1:8000/api/customers',
      mostOrdersCustomerURL: 'http://127.0.0.1:8000/api/customers/most-frequent',
      newCustomerModal: false,

    }
  }



  customerList() {
    axios.get(this.state.customerURL, {
      'headers': {
        'Authorization': sessionStorage.getItem('Authorization')
      }
    }).then((response) => {
      this.setState({
        customers: response.data
      })
    });
  }

  mostOrdersCustomer() {
    axios.get(this.state.mostOrdersCustomerURL, {
      'headers': {
        'Authorization': sessionStorage.getItem('Authorization')
      }
    }).then((response) => {
      this.setState({
        mostOrdersCustomerName: response.data.first_name + " " + response.data.last_name,
        mostOrdersCustomerCount: response.data.frequency
      })
    });
  }

  refresh() {
    this.customerList();
    this.mostOrdersCustomer();
  }

  componentDidMount() {
    this.customerList();
    this.mostOrdersCustomer();
  }

  newCustomerVisible() {
    this.setState({
      newCustomerModal: !this.state.newCustomerModal
    });
  }

  render() {
    let ord = this.state.customers.map((c) => {
      return (
        <TableRow key={(c.id)}>
          <TableCell>{(c.customer_id)}</TableCell>
          <TableCell>{(c.first_name)}</TableCell>
          <TableCell>{(c.last_name)}</TableCell>
          <TableCell><AllOrders customer_id={c.customer_id} /></TableCell>
        </TableRow>
      )
    });


    return (
      <React.Fragment>
        <AppBar position="static" color="default" elevation={0}>
          <Typography style={{ paddingLeft: 20 }}>Summary Analytics:</Typography>
          <Typography style={{ paddingLeft: 20 }}>Customer with the Most Orders: {this.state.mostOrdersCustomerName} ({this.state.mostOrdersCustomerCount} Orders)</Typography>
        </AppBar>
        <Paper>

          <AppBar position="static" color="default" elevation={2}>
            <Toolbar>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <SearchIcon className={this.state.classesblock} color="inherit" />
                </Grid>

                <Grid item xs>

                  <TextField
                    fullWidth
                    placeholder="Search by customer's ID"
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
                  <Button variant="contained" color="primary" onClick={this.newCustomerVisible.bind(this)}>
                    Add Customer
                    </Button>

                  <NewCustomer modalVisible={this.state.newCustomerModal}
                    newCustomerVisible={this.newCustomerVisible.bind(this)}
                    step={1} />


                  <Tooltip title="Reload">
                    <IconButton onClick={this.refresh.bind(this)}>
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
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>All Orders From This Customer</TableCell>
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

      </React.Fragment>
    );
  }
}
