import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import Grid from '@material-ui/core/Grid';


import axios from 'axios';

export default class UserFormInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            customerURL: 'http://127.0.0.1:8000/api/customers',
            addressURL: 'http://127.0.0.1:8000/api/address/',
            customers: [],
            address: [],
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

    addressList() {
        axios.get(this.state.addressURL, {
            'headers': {
                'Authorization': sessionStorage.getItem('Authorization')
            }
        }).then((response) => {
            this.setState({
                address: response.data
            })
        });
    }

    componentDidMount() {
        this.customerList();
        this.addressList();
    }

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    render() {
        const { value } = this.props;
        // console.log("Cus from : " + value.customer_from.first_name + ' ' + value.customer_from.last_name + value.customer_from.customer_id)
        return (
            <React.Fragment>
                <DialogTitle>
                    <Typography color='secondary' variant='h4'>
                        {'Customer Info'}
                    </Typography>
                </DialogTitle>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <DialogContent dividers>
                            <Typography variant='h6'>
                                {'Customer From'}
                            </Typography>
                            <ListItem key={'cus-from-input'}>
                                <TextField
                                    required
                                    select
                                    id="cus-from"
                                    label="Select Customer From"
                                    placeholder="long"
                                    margin="normal"
                                    style={{
                                        width: 200,
                                    }}
                                    defaultValue={value.customer_from.first_name + ' ' + value.customer_from.last_name}
                                    onChange={(e) => {
                                        
                                        e.persist()
                                        this.props.updateCustomer_from_name("first_name", e.target.value.first_name);
                                        this.props.updateCustomer_from_name("last_name", e.target.value.last_name);
                                        this.props.updateCustomer_from_name("customer_id", e.target.value.customer_id);
                                    }}
                                >
                                    {this.state.customers.map(option => (
                                        <MenuItem key={option.customer_id} value={option}>
                                            {option.first_name + ' ' + option.last_name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </ListItem>

                            <Typography variant='h6'>
                                {'Address From'}
                            </Typography>
                            <ListItem key={'add-from-input'}>
                                <TextField
                                    required
                                    select
                                    id="add-from"
                                    label="Select address from"
                                    margin="normal"
                                    style={{
                                        width: 250,
                                    }}
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                        e.persist();
                                        const { address_id, house_number, street_name, apt_number, city, state, zip_code } = e.target.value;
                                        const { updateCustomer_from_address } = this.props;
                                        updateCustomer_from_address("address_id", address_id);
                                        updateCustomer_from_address("house_number", house_number);
                                        updateCustomer_from_address("street_name", street_name);
                                        updateCustomer_from_address("apt_number", apt_number);
                                        updateCustomer_from_address("city", city);
                                        updateCustomer_from_address("state", state);
                                        updateCustomer_from_address("zip_code", zip_code);
                                    }}>
                                    {this.state.address.map(option => (
                                        <MenuItem key={option.address_id} value={option}>
                                            {option.house_number + ' ' + option.street_name + ' ' + ((option.apt_number  + '') === 'null' ? '': option.apt_number) 
                                                + ' ' + option.city + ' ' + option.state + ', ' + option.zip_code}
                                        </MenuItem>
                                    ))}

                                </TextField>
                            </ListItem>




                        </DialogContent>
                    </Grid>
                    <Grid item xs={6}>
                        <DialogContent dividers>
                            <Typography variant='h6'>
                                {'Customer To'}
                            </Typography>
                            <ListItem key={'cus-tp-input'}>
                                <TextField
                                    required
                                    select
                                    id="cus-to"
                                    label="Select Customer To"
                                    placeholder="long"
                                    margin="normal"
                                    style={{
                                        width: 200,
                                    }}
                                    defaultValue={value.customer_to.first_name + ' ' + value.customer_to.last_name}
                                    onChange={(e) => {
                                        e.persist()
                                        this.props.updateCustomer_to_name("first_name", e.target.value.first_name);
                                        this.props.updateCustomer_to_name("last_name", e.target.value.last_name);
                                        this.props.updateCustomer_to_name("customer_id", e.target.value.customer_id);
                                    }}
                                >
                                    {this.state.customers
                                        .filter(option => (option.customer_id !== value.customer_from.customer_id))
                                        .map(option => (
                                            <MenuItem key={option.customer_id} value={option}>
                                                {option.first_name + ' ' + option.last_name}
                                            </MenuItem>
                                        ))}
                                </TextField>
                            </ListItem>
                            <Typography variant='h6'>
                                {'Address To'}
                            </Typography>
                            <ListItem key={'add-to-input'}>
                                <TextField
                                    required
                                    select
                                    id="add-to"
                                    label="Select address To"
                                    margin="normal"
                                    style={{
                                        width: 250,
                                    }}
                                    onChange={(e) => {
                                        e.persist();
                                        const { address_id, house_number, street_name, apt_number, city, state, zip_code } = e.target.value;
                                        const { updateCustomer_to_address } = this.props;
                                        updateCustomer_to_address("address_id", address_id);
                                        updateCustomer_to_address("house_number", house_number);
                                        updateCustomer_to_address("street_name", street_name);
                                        updateCustomer_to_address("apt_number", apt_number);
                                        updateCustomer_to_address("city", city);
                                        updateCustomer_to_address("state", state);
                                        updateCustomer_to_address("zip_code", zip_code);
                                    }}>
                                    {this.state.address.map(option => (
                                        <MenuItem key={option.address_id} value={option}>
                                            {option.house_number + ' ' + option.street_name + ' ' + option.apt_number + ' ' + option.city + ' ' + option.state + ', ' + option.zip_code}
                                        </MenuItem>
                                    ))}

                                </TextField>
                            </ListItem>

                        </DialogContent>
                    </Grid>

                </Grid>
                <DialogActions>
                    <Button variant="contained" onClick={this.props.cancel} color="secondary">
                        Cancel
                     </Button>

                    <Button variant="contained" onClick={this.continue} color="primary">
                        {'Continue'}
                    </Button>

                </DialogActions>
            </React.Fragment>
        )
    }
}
