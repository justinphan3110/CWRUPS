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

export default class CustomerFromInfo extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    render() {
        const { value }  = this.props;
        return (
            <React.Fragment>
                <DialogTitle>
                    <Typography color='secondary' variant='h4'>
                        {'Customer Info'}
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <List>
                        <ListItem key='cus-first-name'>
                            <TextField
                                require
                                id="first-name-from"
                                label="First Name"
                                placeholder="Long"
                                margin="normal"
                                defaultValue={value.first_name}
                                onChange={(e) => {
                                    e.persist()
                                    this.props.updateCustomerInfo("first_name", e.target.value)
                                }}
                            />
                        </ListItem>
                        <ListItem key='cus-last-name'>
                            <TextField
                                require
                                id="last-name-from"
                                label="Last Name"
                                placeholder="Phan"
                                margin="normal"
                                defaultValue={value.last_name}
                                onChange={(e) => {
                                    e.persist()
                                    this.props.updateCustomerInfo("last_name", e.target.value)
                                }}
                            />
                        </ListItem>
                    </List>
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
