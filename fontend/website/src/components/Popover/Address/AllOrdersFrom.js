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
        const { address_id } = this.props;
        const allOrdersFromURL = 'http://127.0.0.1:8000/api/address/orders/from/'
        this.state = {
            address_id,
            allOrdersFromURL,
            allOrders: [],
            allOrdersVisible: false,

            anchorEl: null,
        } 
    }

    allOrders() {
        axios.get(this.state.allOrdersFromURL + this.state.address_id,{
            'headers': {
                'Authorization': sessionStorage.getItem('Authorization')
            }
          })
            .then((response) => {
                this.setState({
                    allOrders: response.data
                })
            });
    }

    allOrdersVisibleToggle() {
        this.setState({
            allOrdersVisible: !this.state.allOrdersVisible
        });
    }

    allOrdersVisible(anchor) {
        this.allOrdersVisibleToggle();
        this.setState({
            anchorEl: anchor,
        })
    }

    componentDidMount() {
        this.allOrders();
    }

    name(cus){
        return cus.first_name + ' ' + cus.last_name + ' - ' + cus.customer_id;
    }

    address(ad){
        return ad.house_number + ' ' + ad.street_name + ' ' + ((ad.apt_number === null) ? '' : ad.apt_number) + ' ' + ad.city + ad.state + ad.zip_code;
    }

    render() {
        let ord = this.state.allOrders.map((c) => {
            const {address, customer_from, customer_to, order_id} = c

            return(
                <TableRow key={order_id}>
                    <TableCell>{order_id}</TableCell>
                    <TableCell>{c.order_date}</TableCell>
                    <TableCell>{c.initial_estimated_arrival_date}</TableCell>
                    <TableCell>{c.weight}</TableCell>
                    <TableCell>{c.type_description}</TableCell>
                    <TableCell>{this.name(customer_from)}</TableCell>
                    <TableCell>{this.name(customer_to)}</TableCell>
                    <TableCell>{address.address_id}</TableCell>
                    <TableCell>{this.address(address)}</TableCell>
                </TableRow>
            )
        });
        return (
            <React.Fragment>
                <Button variant="outlined" color="primary" onClick={(e) => {
                    this.allOrdersVisible(e.currentTarget);
                }}>
                    All Orders
                </Button>

                <Popover
                    id={'all-orders-' + this.state.customer_id}
                    open={this.state.allOrdersVisible}
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
                 <Paper style={{padding:20}}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow key={this.state.customer_id + 'row'}>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Order Date</TableCell>
                                <TableCell>Initial Est Arrival</TableCell>
                                <TableCell>Weight</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>From Customer - ID</TableCell>
                                <TableCell>To Customer - ID</TableCell>
                                <TableCell>Address ID</TableCell>
                                <TableCell>Address To</TableCell>
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
