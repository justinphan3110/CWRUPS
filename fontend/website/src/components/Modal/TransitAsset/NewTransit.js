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

import TransitInfo from './TransitInfo';
import Confirmation from './Confirmation';

export default class NewTransit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: true,
            step: 1,


            make: '',
            model: '',
            purchase_date: '',
            temperature_controlled: 'yes',

        }
    }

    updateTransitInfo = input => e => {
        this.setState({ [input]: e.target.value })
    }

    closeModal() {
        this.props.newAssetVisible();
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

    section() {
        const { step } = this.state;
        const { make, model, purchase_date, temperature_controlled } = this.state
        const value = { make, model, purchase_date, temperature_controlled }
        switch (step) {
            case 1:
                return <TransitInfo
                    nextStep={this.nextStep}
                    value={this.state}
                    updateTransitInfo={this.updateTransitInfo.bind(this)}
                    cancel={this.closeModal.bind(this)} />
            case 2:
                return <Confirmation
                    prevStep={this.prevStep}
                    value={value}
                    cancel={this.closeModal.bind(this)} />
            default:
                return <TransitInfo/>
        }
    }

    render() {
        return (
            <Dialog 
                maxWidth={'mid'}
                onClose={this.closeModal.bind(this)}
                open={this.props.modalVisible}>

                <DialogTitle id='add new transit title'>
                    <Typography color='primary' variant='h3'>
                        Add New Transit    
                    </Typography>    
                </DialogTitle>    
                {this.section()}
            </Dialog>
        )
    }
}
