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
    
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }


    post() {
        const { value } = this.props;
        const { house_number, street_name, apt_number, city, state, zip_code } = value;

        axios.post('http://127.0.0.1:8000/api/address/', {
            "house_number": house_number,
            "street_name": street_name,
            "apt_number": apt_number,
            "city": city,
            "state": state,
            "zip_code": zip_code
        }, {
            'headers': {
                'Authorization': sessionStorage.getItem('Authorization')
            }
        }).catch(error => console.log(error))
        this.props.cancel();
    }


    render() {
        const { value } = this.props;
        const { house_number, street_name, apt_number, city, state, zip_code } = value;

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
                                {'#House: ' + house_number}
                            </Typography>
                        </ListItem>
                        <ListItem key='sn'>
                            <Typography variant='h6'>
                                {'Street Name: ' + street_name}
                            </Typography>
                        </ListItem>

                        <ListItem key='an'>
                            <Typography variant='h6'>
                                {'Apt number: ' + apt_number}
                            </Typography>
                        </ListItem>

                        <ListItem key='an'>
                            <Typography variant='h6'>
                                {'city: ' + city}
                            </Typography>
                        </ListItem>

                        <ListItem key='st'>
                            <Typography variant='h6'>
                                {'State: ' + state}
                            </Typography>
                        </ListItem>

                        <ListItem key='zc'>
                            <Typography variant='h6'>
                                {'Zip Code: ' + zip_code}
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
                        {'Add Address'}
                    </Button>
                </DialogActions>
            </React.Fragment>
        )
    }
}
