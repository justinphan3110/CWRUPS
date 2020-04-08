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

import NewAddress from './Modal/Address/NewAddress'
import AllOrdersFrom from './Popover/Address/AllOrdersFrom'

export default class AddressContent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            address: [],
            toggleRefreshAddress: false,
            addressURL: 'http://127.0.0.1:8000/api/address',
            mostOrdersStateURL: 'http://127.0.0.1:8000/api/ship/from/address/states/most-popular',
            newAddressModal: false,
        }
    }

    addressList() {
        axios.get(this.state.addressURL,{
          'headers': {
              'Authorization': sessionStorage.getItem('Authorization')
          }
        }).then((response) => {
            this.setState({
                address: response.data
            })
        });
    }

    mostOrdersState() {
        axios.get(this.state.mostOrdersStateURL,{
          'headers': {
              'Authorization': sessionStorage.getItem('Authorization')
          }
        }).then((response) => {
            this.setState({
                mostOrdersState: response.data.state,
                mostOrdersStateCount: response.data.count
            })
        });
    }

    refresh() {
        this.addressList();
        this.mostOrdersState();
    }

    newAddressVisible() {
        this.setState({
            newAddressModal: ! this.state.newAddressModal
        });
    }

    componentDidMount(){
        this.addressList();
        this.mostOrdersState();
    }

    render() {
        let add = this.state.address.map((c) => {
          return (
            <TableRow key={(c.address_id)}>
              <TableCell>{(c.address_id)}</TableCell>
              <TableCell>{(c.house_number)}</TableCell>
              <TableCell>{(c.street_name)}</TableCell>
              <TableCell>{(c.apt_number)}</TableCell>
              <TableCell>{(c.city)}</TableCell>
              <TableCell>{(c.state)}</TableCell>
              <TableCell>{(c.zip_code)}</TableCell>
              <TableCell><AllOrdersFrom address_id={c.address_id}/></TableCell>
            </TableRow>
          )
        });
    
    
        return (
          <Paper>
            <h3>Summary Analytics:</h3>
            <p><b>State with the Most Orders:</b> {this.state.mostOrdersState} ({this.state.mostOrdersStateCount} Orders)</p>
            <hr/ >
            <AppBar position="static" color="default" elevation={0}>
              <Toolbar>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <SearchIcon className={this.state.classesblock} color="inherit" />
                  </Grid>
                  <Grid item xs>
                    <TextField
                      fullWidth
                      placeholder="Search by Address's ID"
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
                    <Button variant="contained" color="primary" onClick={this.newAddressVisible.bind(this)}>
                      Add Address
                    </Button>

                   <NewAddress modalVisible={this.state.newAddressModal}
                    newAddressVisible={this.newAddressVisible.bind(this)}
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
                      <TableCell>#House</TableCell>
                      <TableCell>Street Name</TableCell>
                      <TableCell>#Apt</TableCell>
                      <TableCell>City</TableCell>
                      <TableCell>State</TableCell>
                      <TableCell>Zip Code</TableCell>
                      <TableCell>All Orders From This Address</TableCell>
                    </TableRow>
                  </TableHead>
    
                  <TableBody>
                    {add}
                  </TableBody>
    
                </Table>
              </Typography>
              {/* </div> */}
            </div>
          </Paper>
        );
    }
}
