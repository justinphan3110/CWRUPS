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

export default class AllOrdersFrom extends Component {
    constructor(props){
        super(props)
        const {distribution_center_id} = this.props;
        this.state = {
            // url
            allOrderDetailsURL : 'http://127.0.0.1:8000/api/distribution-center/orders/',

            distribution_center_id,
            allOrderPopOver: false,
            anchorEl: null,
            allOrders: [],

        }
    }

    allOrders(){
        axios.get(this.state.allOrderDetailsURL + this.state.distribution_center_id, {
            'headers': {
                'Authorization': sessionStorage.getItem('Authorization')
            }
        })
            .then((response) => {
                this.setState({
                    allOrders: response.data
                })
            }).catch(error => console.log(error));
    }

    componentDidMount(){
        this.allOrders();
    }

    allOrderPopOverToggle() {
        this.setState({
            allOrderPopOver : !this.state.allOrderPopOver,
        });
    }

    allOrdersVisible(anchor) {
        this.allOrderPopOverToggle();
        this.setState({
            anchorEl:anchor,
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



    render() {
        let ord = this.state.allOrders.map((c) => {
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
                    this.allOrdersVisible(e.currentTarget);
                }}>
                    All Orders
                </Button>
                <Popover
                    id={'more-details' + this.state.distribution_center_id}
                    open={this.state.allOrderPopOver}
                    anchorEl={this.state.anchorEl}
                    onClose={this.allOrdersVisible.bind(this, null)}
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
                                <TableRow key={this.state.distribution_center_id + 'row'}>
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
