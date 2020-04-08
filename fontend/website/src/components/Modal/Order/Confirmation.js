import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import axios from 'axios';

export default class Confirmation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            customerFromDropDown: false,
            customerToDropDown: false,
            packageInfoDropDown: false
        }
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    cusFromToggle() {
        this.setState({
            customerFromDropDown: !this.state.customerFromDropDown
        })
    }

    cusToToggle() {
        this.setState({
            customerToDropDown: !this.state.customerToDropDown
        })
    }

    packageInfoToggle() {
        this.setState({
            packageInfoDropDown: !this.state.packageInfoDropDown
        })
    }

    post() {
        const { value } = this.props;

        axios.post('http://127.0.0.1:8000/api/orders/', {
            "order_date": value.order_date + 'T00:00:00Z',
            "initial_estimated_arrival_date": value.initial_estimated_arrival_date + 'T00:00:00Z',
            "weight": value.weight
        }, {
            'headers': {
                'Authorization': sessionStorage.getItem('Authorization')
            }
        }).then((response) => {
            const orderId = response.data.order_id
            this.addShipFromCustomer(orderId, value.customer_from.customer_id);
            this.addShipToCustomer(orderId, value.customer_to.customer_id);
            this.addOrderParcelType(orderId, value.parcel_type_id)
            this.addShipFromAddress(orderId, value.customer_from.address.address_id);
            this.addShipToAddress(orderId, value.customer_to.address.address_id);
        })
            .catch(error => console.log(error))
        this.props.cancel()

    }

    addOrderParcelType(orderId, parcelType) {
        axios.post('http://127.0.0.1:8000/api/parceltype/', {
            order_id: orderId,
            parcel_type: parcelType
        }, {
            'headers': {
                'Authorization': sessionStorage.getItem('Authorization')
            }
        }).catch(error => console.log(error))
    }

    addShipFromCustomer(orderId, customerId) {
        axios.post('http://127.0.0.1:8000/api/ship/from/customers/', {
            order_id: orderId,
            customer_id: customerId
        }, {
            'headers': {
                'Authorization': sessionStorage.getItem('Authorization')
            }
        }).catch(error => console.log(error))
    }

    addShipToCustomer(orderId, customerId) {
        axios.post('http://127.0.0.1:8000/api/ship/to/customers/', {
            order_id: orderId,
            customer_id: customerId
        }, {
            'headers': {
                'Authorization': sessionStorage.getItem('Authorization')
            }
        }).catch(error => console.log(error))
    }

    addShipToAddress(orderId, addressId) {
        axios.post('http://127.0.0.1:8000/api/ship/to/address/', {
            order_id: orderId,
            address_id: addressId
        }, {
            'headers': {
                'Authorization': sessionStorage.getItem('Authorization')
            }
        }).catch(error => console.log(error))
    }

    addShipFromAddress(orderId, addressId) {
        axios.post('http://127.0.0.1:8000/api/ship/from/address/', {
            order_id: orderId,
            address_id: addressId
        }, {
            'headers': {
                'Authorization': sessionStorage.getItem('Authorization')
            }
        }).catch(error => console.log(error))
    }



    render() {
        const { value } = this.props;
        return (
            <React.Fragment>
                <DialogTitle>
                    <Typography color='secondary' variant='h5'>
                        {'Confirmation'}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <List>
                        <ListItem button onClick={this.cusFromToggle.bind(this)}>
                            <Typography variant='h6' color="secondary">
                                {'Customer From'}
                            </Typography>
                            {this.state.customerFromDropDown ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={this.state.customerFromDropDown} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem>
                                    <ListItemText primary={"Customer ID: " + value.customer_from.customer_id} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={"First Name: " + value.customer_from.first_name} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={"Last Name: " + value.customer_from.last_name} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={"Address ID: " + value.customer_from.address.address_id} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={"#House: " + value.customer_from.address.house_number} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={"Street_Name: " + value.customer_from.address.street_name} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={"#Apt: " + value.customer_from.address.apt_number} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={"City: " + value.customer_from.address.city} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={"State: " + value.customer_from.address.state} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={"Zip_code: " + value.customer_from.address.zip_code} />
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>
                    <List>
                        <ListItem button onClick={this.cusToToggle.bind(this)}>
                            <Typography variant='h6' color="secondary">
                                {'Customer To'}
                            </Typography>
                            {this.state.customerToDropDown ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={this.state.customerToDropDown} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem>
                                    <ListItemText primary={"Customer ID: " + value.customer_to.customer_id} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={"First Name: " + value.customer_to.first_name} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={"Last Name: " + value.customer_to.last_name} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={"Address ID: " + value.customer_to.address.address_id} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={"#House: " + value.customer_to.address.house_number} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={"Street_Name: " + value.customer_to.address.street_name} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={"#Apt: " + value.customer_to.address.apt_number} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={"City: " + value.customer_to.address.city} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={"State: " + value.customer_to.address.state} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={"Zip Code: " + value.customer_to.address.zip_code} />
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>
                    <List>
                        <ListItem button onClick={this.packageInfoToggle.bind(this)}>
                            <Typography variant='h6' color="secondary">
                                {'Package Info'}
                            </Typography>
                            {this.state.packageInfoDropDown ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={this.state.packageInfoDropDown} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem>
                                    <ListItemText primary={"Parce Type: " + value.parcel_type_description} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={"Weight: " + value.weight} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={"Order Date: " + value.order_date} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={"Initial Estimate Date: " + value.initial_estimated_arrival_date} />
                                </ListItem>

                            </List>
                        </Collapse>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={this.props.cancel} color="secondary">
                        Cancel
                     </Button>

                    <Button variant="contained" onClick={this.back} color="secondary">
                        {'Back'}
                    </Button>

                    <Button variant="contained" onClick={this.post.bind(this)} color="primary">
                        {'Add Order'}
                    </Button>


                </DialogActions>
            </React.Fragment>
        )
    }
}
