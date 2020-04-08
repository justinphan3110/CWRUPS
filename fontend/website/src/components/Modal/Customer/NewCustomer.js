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

// import Confirmation from './Confirmation';
import CustomerFromInfo from './CustomerFromInfo';
import Confirmation from './Confirmation';

export default class NewCustomer extends Component {
    constructor(props) {
        super(props)
        const { step } = this.props
        this.state = {
            modalVisible: true,
            step,

            customer: {
                first_name: '',
                last_name: '',
            },
        }
    }

    closeModal() {
        this.props.newCustomerVisible();
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

    updateCustomerInfo(field, newValue){
        switch (field){
            case "first_name":
                this.setState(prevState => ({
                   customer: {
                       ...prevState.customer,
                       first_name: newValue
                   } 
                }));
            case "last_name":
                    this.setState(prevState => ({
                        customer: {
                            ...prevState.customer,
                            last_name: newValue
                        } 
                     }));  
        }
    }

    section() {
        const { step } = this.state;

        switch (step) {
            case 1:
                return <CustomerFromInfo
                    nextStep={this.nextStep}
                    value={this.state.customer}
                    updateCustomerInfo={this.updateCustomerInfo.bind(this)}
                    cancel={this.closeModal.bind(this)} />
            case 2:
                return <Confirmation
                    prevStep={this.prevStep}
                    value={this.state.customer}
                    cancel={this.closeModal.bind(this)} />
        }

    }


    render() {
        return (
            <Dialog maxWidth={'md'}
                onClose={this.closeModal.bind(this)}
                open={this.props.modalVisible}>

                <DialogTitle id="add-new-customer-title">
                    <Typography color='primary' variant='h3'>
                        Add New Customer
                    </Typography>
                </DialogTitle>
                {this.section()}
            </Dialog>
        )
    }
}
