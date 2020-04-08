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

import AddressFromInfo from './AddressFormInfo';
import Confirmation from './Confirmation';

export default class NewAddress extends Component {
    constructor(props) {
        super(props)
        const { step } = this.props
        this.state = {
            modalVisble: true,
            step,

            // address props
            house_number: '',
            street_name: '',
            apt_number: undefined,
            city: '',
            state: '',
            zip_code: ''
        }
    }

    closeModal() {
        this.props.newAddressVisible();
        this.setState({
            step: 1
        })
    }

    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    }

    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    }


    updateAddressInfo = input => e => {
        this.setState({ [input]: e.target.value })
    }

    section() {
        const { step } = this.state;
        const { house_number, street_name, apt_number, city, state, zip_code } = this.state;
        const values = { house_number, street_name, apt_number, city, state, zip_code };

        switch (step) {
            case 1:
                return <AddressFromInfo
                    nextStep={this.nextStep}
                    value={values}
                    updateAddressInfo={this.updateAddressInfo.bind(this)}
                    cancel={this.closeModal.bind(this)}
                />
            case 2:
                return <Confirmation
                    prevStep={this.prevStep}
                    value={values}
                    cancel={this.closeModal.bind(this)}
                />
            default:
                return <Confirmation/>
        }

    }


    render() {
        return (
            <Dialog
                maxWidth={'md'}
                onClose={this.closeModal.bind(this)}
                open={this.props.modalVisible}>
                <DialogTitle id="add-new-order-title">
                    <Typography color='primary' variant="h3">
                        Add New Address
          </Typography>
                </DialogTitle>
                {this.section()}
            </Dialog>
        )
    }
}
