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
import axios from 'axios'

export default class Confirmation extends Component {
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    post() {
        const { value } = this.props;
        const { make, model, purchase_date, temperature_controlled } = value;

        const data = {
            make,
            model,
            purchase_date: purchase_date + 'T00:00:00Z',
            temperature_controlled: (temperature_controlled === 'yes'),
        }
        console.log(data)
        axios.post('http://127.0.0.1:8000/api/transit-assets/', data, {
            'headers': {
                'Authorization': sessionStorage.getItem('Authorization')
            }
        }).catch(error => console.log(error))
        this.props.cancel();
    }

    render() {
        const { value } = this.props;
        const { make, model, purchase_date, temperature_controlled } = value;

        return (
            <React.Fragment>
                <DialogTitle>
                    <Typography color='secondary' variant='h5'>
                        {'Confirmation'}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <List>
                        <ListItem key='hn'>
                            <Typography variant='h6'>
                                {'Make: ' + make}
                            </Typography>
                        </ListItem>
                        <ListItem key='sdada'>
                            <Typography variant='h6'>
                                {'Modal: ' + model}
                            </Typography>
                        </ListItem>
                        <ListItem key='dasdasdf'>
                            <Typography variant='h6'>
                                {'Purchase Date: ' + purchase_date}
                            </Typography>
                        </ListItem>
                        <ListItem key='rqwrwq'>
                            <Typography variant='h6'>
                                {'Temp Control: ' + temperature_controlled}
                            </Typography>
                        </ListItem>

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
                        {'Add Transit Asset'}
                    </Button>
                </DialogActions>
            </React.Fragment >
        )
    }
}
