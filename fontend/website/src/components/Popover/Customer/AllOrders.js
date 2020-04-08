import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

import TableBody from '@material-ui/core/TableBody'

import Paper from '@material-ui/core/Paper';
import axios from 'axios';

export default class AllOrders extends Component {
    constructor(props) {
        super(props)
        const { customer_id } = this.props;
        const allOrderURL = 'http://127.0.0.1:8000/api/customers/orders/from/'
        this.state = {
            customer_id,
            allOrderURL,
            allOrders: [],
            allOrdersVisible: false,
            // pop over elements
            anchorEl: null
        }
    }

    allOrders() {
        axios.get(this.state.allOrderURL + this.state.customer_id,{
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

    render() {
        let ord = this.state.allOrders.map((c) => {
            return(
                <TableRow key={(c.order_id)}>
                    <TableCell>{c.order_id}</TableCell>
                    <TableCell>{c.order_date}</TableCell>
                    <TableCell>{c.initial_estimated_arrival_date}</TableCell>
                    <TableCell>{c.weight}</TableCell>
                    <TableCell>{c.type_description}</TableCell>
                    <TableCell>{c.customer_to_id}</TableCell>
                    <TableCell>{c.customer_to_first_name + ' ' + c.customer_to_last_name}</TableCell>
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
                                <TableCell>Customer To ID</TableCell>
                                <TableCell>To (id)</TableCell>
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
