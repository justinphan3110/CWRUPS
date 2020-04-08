import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover';
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'

import Paper from '@material-ui/core/Paper';

import axios from 'axios';


export default class MoreDetails extends Component {
    constructor(props) {
        super(props)
        const { order_id, weight } = this.props;
        const orderURL = 'http://127.0.0.1:8000/api/orders/'
        this.state = {
            //url
            parcelDescriptionURL: orderURL + 'description/',
            customerToURL: orderURL + 'ship/to/customer/',
            customerFromURL: orderURL + 'ship/from/customer/',
            addressToURL: orderURL + 'ship/to/address/',
            addressFromURL: orderURL + 'ship/from/address/',
            moreDetailsURL: orderURL + 'moredetails/',

            order_id,
            weight,
            moreDetailsPopOver: false,
            anchorEl: null,
            parcelDescription: '',
            customerTo: {},
            customerFrom: {},
            addressTo: {},
            addressFrom: {},
            moreDetails: [],
        }
    }


    parcelDescription() {
        axios.get(this.state.parcelDescriptionURL + this.state.order_id, {
            'headers': {
                'Authorization': sessionStorage.getItem('Authorization')
            }
        })
            .then((response) => {
                this.setState({
                    parcelDescription: response.data.parcel_description
                });
            }).catch(error => console.log(error));
    }

    customerToDescription() {
        axios.get(this.state.customerToURL + this.state.order_id, {
            'headers': {
                'Authorization': sessionStorage.getItem('Authorization')
            }
        })
            .then((response) => {
                this.setState({
                    customerTo: response.data
                })
            }).catch(error => console.log(error))
    }

    customerFromDescription() {
        axios.get(this.state.customerFromURL + this.state.order_id, {
            'headers': {
                'Authorization': sessionStorage.getItem('Authorization')
            }
        })
            .then((response) => {
                this.setState({
                    customerFrom: response.data
                })
            }).catch(error => console.log(error));
    }

    addressToDescription() {
        axios.get(this.state.addressToURL + this.state.order_id, {
            'headers': {
                'Authorization': sessionStorage.getItem('Authorization')
            }
        })
            .then((response) => {
                this.setState({
                    addressTo: response.data
                });
            }).catch(error => console.log(error))
    }

    addressFromDescription() {
        axios.get(this.state.addressFromURL + this.state.order_id, {
            'headers': {
                'Authorization': sessionStorage.getItem('Authorization')
            }
        })
            .then((response) => {
                this.setState({
                    addressFrom: response.data
                });
            }).catch(error => console.log(error))
    }

    moreDetails() {
        axios.get(this.state.moreDetailsURL + this.state.order_id, {
            'headers': {
                'Authorization': sessionStorage.getItem('Authorization')
            }
        })
            .then((response) => {
                this.setState({
                    moreDetails: response.data
                })
            }).catch(error => console.log(error));
    }

    componentWillMount() {
        this.moreDetails();
        // console.log(this.state.moreDetails);
    }

    moreDetailsPopOverToggle() {
        this.setState({
            moreDetailsPopOver: !this.state.moreDetailsPopOver,
        })
    }

    moreDetailsVisible(anchor) {
        this.moreDetailsPopOverToggle();
        this.setState({
            anchorEl: anchor,
        })
    }

    address(ad) {
        return ad.house_number + ' ' + ad.street_name + ' '
            + (ad.apt_number === null ? '' : ad.apt_number) + ' '
            + ad.city + ' ' + ad.state + ' ' + ad.zip_code;
    }

    name(cus) {
        return cus.first_name + ' ' + cus.last_name + ' - ' + cus.customer_id
    }

    address(ad) {
        return ad.house_number + ' ' + ad.street_name + ' ' + ((ad.apt_number === null) ? '' : ad.apt_number) + ' ' + ad.city + ad.state + ad.zip_code + ' - ' + ad.address_id;
    }



    render() {
        let ord = this.state.moreDetails.map((c) => {
            const { order_id, weight, type_description, customer, address } = c
            return (
                <TableRow key={order_id}>
                    <TableCell>{order_id}</TableCell>
                    <TableCell>{weight}</TableCell>
                    <TableCell>{type_description}</TableCell>
                    <TableCell>{this.name(customer.from)}</TableCell>
                    <TableCell>{this.name(customer.to)}</TableCell>
                    <TableCell>{this.address(address.from)}</TableCell>
                    <TableCell>{this.address(address.to)}</TableCell>
                </TableRow>
            )
        })
        return (
            <React.Fragment>
                <Button variant="outlined" color="primary" onClick={(e) => {
                    this.moreDetailsVisible(e.currentTarget);
                }}>
                    More Details
                </Button>
                <Popover
                    id={'more-details' + this.state.order_id}
                    open={this.state.moreDetailsPopOver}
                    anchorEl={this.state.anchorEl}
                    onClose={this.moreDetailsVisible.bind(this, null)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Paper style={{ padding: 20 }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow key={this.state.customer_id + 'row'}>
                                    <TableCell>Order ID</TableCell>
                                    <TableCell>Weight (pounds)</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>From Customer - ID</TableCell>
                                    <TableCell>To Customer - ID</TableCell>
                                    <TableCell>Address From - ID</TableCell>
                                    <TableCell>Address To - ID</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {ord}
                            </TableBody>

                        </Table>

                    </Paper>
                </Popover>
            </React.Fragment>
        )
    }
}
