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
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';

export default class OrderInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            parcelURL: 'http://127.0.0.1:8000/api/parcel',
            parcelType: [],
        }
    }

    componentDidMount() {
        axios.get(this.state.parcelURL, {
            'headers': {
                'Authorization': sessionStorage.getItem('Authorization')
            }
        }).then((response) => {
            this.setState({
                parcelType: response.data
            })
        });
    }

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    today() {
        var today = new Date();
        var date = today.getDate();
        var stringDate = date >= 10 ? date + '' : '0' + date;
        return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + stringDate;
    }
    render() {
        console.log(this.today())
        const { value, updateOrderInfo } = this.props;
        return (
            <React.Fragment>
                <DialogTitle>
                    <Typography color='secondary' variant='h5'>
                        {'Order Info'}
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <ListItem key={'parceltype-input'}>
                        <TextField
                            required
                            select
                            id="cus-from"
                            label="Select Parcel Type"
                            margin="normal"
                            style={{
                                width: 200,
                            }}
                            onChange={(e) => {
                                this.props.updateParcelType(e.target.value);
                            }}
                        >
                            {this.state.parcelType.map(option => (
                                <MenuItem key={option.type_id} value={option}>
                                    {option.type_description}
                                </MenuItem>
                            ))}
                        </TextField>
                    </ListItem>
                    <ListItem key="order-weight">
                        <TextField
                            id="order weight"
                            label="Weight"
                            placeholder="0"
                            margin="normal"
                            helperText="pound(s)"
                            defaultValue={value.wieght}
                            onChange={updateOrderInfo('weight')}
                        />
                    </ListItem>
                    <ListItem key="order-date">
                        <TextField
                            require
                            id="date"
                            label="Order Date"
                            type="date"
                            defaultValue={this.today()}
                            onChange={updateOrderInfo('order_date')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </ListItem>
                    <ListItem key="initial-arrival-date">
                        <TextField
                            id="initial-arrival-date"
                            label="Estimate Arrival Date"
                            type="date"
                            defaultValue={this.today()}
                            onChange={updateOrderInfo('initial_estimated_arrival_date')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </ListItem>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={this.props.cancel} color="secondary">
                        Cancel
                     </Button>

                    <Button variant="contained" onClick={this.back} color="secondary">
                        {'Back'}
                    </Button>

                    <Button variant="contained" onClick={this.continue} color="primary">
                        {'Continue'}
                    </Button>


                </DialogActions>

            </React.Fragment>
        )
    }
}
