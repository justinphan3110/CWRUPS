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

export default class TransitInfo extends Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    today() {
        var today = new Date();
        var date = today.getDate();
        var stringDate = date >= 10 ? date + '' : '0' + date;
        return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + stringDate;
    }

    render() {
        const { value, updateTransitInfo } = this.props;
        const temp = [
            {
                option: 'yes',
                description: 'Yes',
            },
            {
                option: 'no',
                description: 'No',
            },
        ]
        return (
            <React.Fragment>
                <DialogTitle>
                    <Typography color='secondary' variant='h4'>
                        {'Transit Info'}
                    </Typography>
                </DialogTitle>


                <DialogContent dividers>
                    <List>
                        <ListItem key='dsaf'>
                            <TextField
                                require
                                id='dafaf'
                                label='Make'
                                defaultValue={value.make}
                                onChange={updateTransitInfo('make')}
                            />
                        </ListItem>
                        <ListItem key='dasfasf'>
                            <TextField
                                require
                                id='daweqrfaf'
                                label='Model'
                                defaultValue={value.model}
                                onChange={updateTransitInfo('model')}
                            />
                        </ListItem>
                        <ListItem key="purchase_date-date">
                            <TextField
                                require
                                id="purchase_date"
                                label="Purchase Date"
                                type="date"
                                defaultValue={this.today()}
                                onChange={updateTransitInfo('purchase_date')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </ListItem>
                        <ListItem key={'temp'}>
                            <TextField
                                required
                                select
                                id="temp"
                                label="Temperature Controlled"
                                margin="normal"
                                style={{
                                    width: 200,
                                }}
                                onChange={updateTransitInfo('temperature_controlled')}
                            >
                                {temp.map(option => (
                                    <MenuItem key={option.option} value={option.option}>
                                        {option.description}
                                    </MenuItem>
                                ))}
                            </TextField>
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


                </DialogActions>u
            </React.Fragment>
        )
    }
}
