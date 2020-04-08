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
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    post() {
        console.log("post customer " + this.props.value)
        const {value} = this.props;
        axios.post('http://127.0.0.1:8000/api/customers/', {
            "first_name": value.first_name,
            "last_name" : value.last_name
        }, {
            'headers': {
                'Authorization': sessionStorage.getItem('Authorization')
            }
        })
             .then(function (response) {
                //  console.log(response);
             })
             .catch(error => console.log(error))

        this.props.cancel();     
    }

    render() {
        const { value } = this.props;
        return (
            <React.Fragment>
                <DialogTitle>
                    <Typography color='secondary' variant='h5'>
                        {'Confirmation'}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <List>
                        <ListItem key='fn'>
                            <Typography variant='h6'>
                                {'First Name: ' + value.first_name}
                            </Typography>
                        </ListItem>
                        <ListItem key='ln'>
                            <Typography variant='h6'>
                                {'Last Name: ' + value.last_name}
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
                        {'Add Customer'}
                    </Button>
                </DialogActions>
            </React.Fragment>
        )
    }
}
