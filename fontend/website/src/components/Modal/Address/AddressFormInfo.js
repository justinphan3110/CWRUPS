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

export default class AddressFormInfo extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }


    render() {
        const { value, updateAddressInfo } = this.props;
        return (
            <React.Fragment>
                <DialogTitle>
                    <Typography color='secondary' variant='h4'>
                        {'Address Info'}
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <ListItem key={'house-number-from'}>
                        <TextField
                            required
                            id="house-number-from"
                            label="House number"
                            placeholder="2345"
                            margin="normal"
                            //   value={this.state.customer_from.address.house_number}
                            defaultValue={value.house_number}
                            onChange={updateAddressInfo('house_number')}

                        />
                    </ListItem>
                    <ListItem key={'street-name-from'}>
                        <TextField
                            required
                            id="street-name-from"
                            label="Street Name"
                            placeholder="Murray Hill"
                            margin="normal"
                            //   value={this.state.customer_from.address.street_name}
                            defaultValue={value.street_name}
                            onChange={updateAddressInfo('street_name')}
                        />
                    </ListItem>
                    <ListItem key={'apt-number-from'}>
                        <TextField
                            id="apt-number-from"
                            label="Apt number"
                            placeholder="#320C"
                            margin="normal"
                            //   value={this.state.customer_from.address.apt_number}
                            defaultValue={value.apt_number}
                            onChange={updateAddressInfo('apt_number')}
                        />
                    </ListItem>
                    <ListItem key={'city-from'}>
                        <TextField
                            required
                            id="city-from"
                            label="City"
                            placeholder="Murray Hill"
                            margin="normal"
                            //   value={this.state.customer_from.address.city}
                            defaultValue={value.city}

                            onChange={updateAddressInfo('city')}
                        />
                    </ListItem>
                    <ListItem key={'state-from'}>
                        <TextField
                            required
                            id="state-from"
                            label="State"
                            placeholder="Murray Hill"
                            margin="normal"
                            defaultValue={value.state}
                            onChange={updateAddressInfo('state')}
                        />
                    </ListItem>
                    <ListItem key={'zip_code-from'}>
                        <TextField
                            required
                            id="zip-from"
                            label="Zip Code"
                            placeholder="Murray Hill"
                            margin="normal"
                            defaultValue={value.zip_code}
                            onChange={updateAddressInfo('zip_code')}
                        />
                    </ListItem>
                </DialogContent>
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
