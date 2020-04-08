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

import UserFromInfo from './UserFormInfo';
import Confirmation from './Confirmation';
import OrderInfo from './OrderInfo';

export default class newOrder extends Component {
  constructor(props) {
    super(props)
    const { step } = this.props

    this.state = {
      modalVisible: true,
      step,

      // customer from
      customer_from: {
        customer_id: 0,
        first_name: '',
        last_name: '',
        address: { address_id: 0, house_number: '', street_name: '', apt_number: undefined, city: '', state: '', zip_code: '' },
      },

      // customer to
      customer_to: {
        customer_id: 0,
        first_name: '',
        last_name: '',
        address: { address_id: 0, house_number: '', street_name: '', apt_number: undefined, city: '', state: '', zip_code: '' },
      },

      // New Order
      order_date: this.currentOrderDate(0),
      initial_estimated_arrival_date: this.currentOrderDate(0),
      weight: '',
      parcel_type_id: 0,
      parcel_type_description: '',

    }
  }



  currentOrderDate(offset) {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() + offset);
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // return date + 'T' + time + 'Z';
    return date;
  }

  closeModal() {
    this.props.newOrderVisible();
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

  updateCustomer_from_name(field, newValue) {
    switch (field) {
      case "first_name":
        this.setState(prevState => ({
          customer_from: {
            ...prevState.customer_from,
            first_name: newValue
          }
        }))
      case "last_name":
        this.setState(prevState => ({
          customer_from: {
            ...prevState.customer_from,
            last_name: newValue
          }
        }))
      case "customer_id":
        this.setState(prevState => ({
          customer_from: {
            ...prevState.customer_from,
            customer_id: newValue
          }
        }))
    }
  }

  updateCustomer_to_name(field, newValue) {
    switch (field) {
      case "first_name":
        this.setState(prevState => ({
          customer_to: {
            ...prevState.customer_to,
            first_name: newValue
          }
        }));
        break;
      case "last_name":
        this.setState(prevState => ({
          customer_to: {
            ...prevState.customer_to,
            last_name: newValue
          }
        }));
        break;
      case "customer_id":
        this.setState(prevState => ({
          customer_to: {
            ...prevState.customer_to,
            customer_id: newValue
          }
        }));
        break;
    }
  }

  updateCustomer_from_address(field, newValue) {
    switch (field) {
      case "house_number":
        this.setState(prevState => ({
          customer_from: {
            ...prevState.customer_from,
            address: {
              ...prevState.customer_from.address,
              house_number: newValue
            }
          }
        }));
        break;
      case "street_name":
        this.setState(prevState => ({
          customer_from: {
            ...prevState.customer_from,
            address: {
              ...prevState.customer_from.address,
              street_name: newValue
            }
          }
        }));
        break;
      case "apt_number":
        this.setState(prevState => ({
          customer_from: {
            ...prevState.customer_from,
            address: {
              ...prevState.customer_from.address,
              apt_number: newValue
            }
          }
        }));
        break;
      case "city":
        this.setState(prevState => ({
          customer_from: {
            ...prevState.customer_from,
            address: {
              ...prevState.customer_from.address,
              city: newValue
            }
          }
        }));
        break;
      case "state":
        this.setState(prevState => ({
          customer_from: {
            ...prevState.customer_from,
            address: {
              ...prevState.customer_from.address,
              state: newValue
            }
          }
        }));
        break;
      case "zip_code":
        this.setState(prevState => ({
          customer_from: {
            ...prevState.customer_from,
            address: {
              ...prevState.customer_from.address,
              zip_code: newValue
            }
          }
        }));
        break;
      case "address_id":
        this.setState(prevState => ({
          customer_from: {
            ...prevState.customer_from,
            address: {
              ...prevState.customer_from.address,
              address_id: newValue
            }
          }
        }));
        break;
    }
  }

  updateCustomer_to_address(field, newValue) {
    switch (field) {
      case "house_number":
        this.setState(prevState => ({
          customer_to: {
            ...prevState.customer_to,
            address: {
              ...prevState.customer_to.address,
              house_number: newValue
            }
          }
        }));
        break;
      case "street_name":
        this.setState(prevState => ({
          customer_to: {
            ...prevState.customer_to,
            address: {
              ...prevState.customer_to.address,
              street_name: newValue
            }
          }
        }));
        break;
      case "apt_number":
        this.setState(prevState => ({
          customer_to: {
            ...prevState.customer_to,
            address: {
              ...prevState.customer_to.address,
              apt_number: newValue
            }
          }
        }));
        break;
      case "city":
        this.setState(prevState => ({
          customer_to: {
            ...prevState.customer_to,
            address: {
              ...prevState.customer_to.address,
              city: newValue
            }
          }
        }));
        break;
      case "state":
        this.setState(prevState => ({
          customer_to: {
            ...prevState.customer_to,
            address: {
              ...prevState.customer_to.address,
              state: newValue
            }
          }
        }));
        break;
      case "zip_code":
        this.setState(prevState => ({
          customer_to: {
            ...prevState.customer_to,
            address: {
              ...prevState.customer_to.address,
              zip_code: newValue
            }
          }
        }));
        break;
      case "address_id":
        this.setState(prevState => ({
          customer_to: {
            ...prevState.customer_to,
            address: {
              ...prevState.customer_to.address,
              address_id: newValue
            }
          }
        }));
        break;

    }
  }

  updateOrderInfo = input => e => {
    console.log(e.target.value)
    this.setState({ [input]: e.target.value })
  }

  updateParcelType(newValue) {
    this.setState({
      parcel_type_id: newValue.type_id,
      parcel_type_description: newValue.type_description
    });
    console.log("in update parcelType: " + this.state.parcel_type_description)
  }

  section() {
    const { step } = this.state;
    const { customer_from, customer_to, order_date, initial_estimated_arrival_date, weight, parcel_type_description, parcel_type_id } = this.state;
    const values = { customer_from, customer_to, order_date, initial_estimated_arrival_date, weight, parcel_type_description, parcel_type_id };

    switch (step) {
      case 1:
        return <UserFromInfo
          nextStep={this.nextStep}
          value={values}
          updateCustomer_from_name={this.updateCustomer_from_name.bind(this)}
          updateCustomer_from_address={this.updateCustomer_from_address.bind(this)}
          updateCustomer_to_name={this.updateCustomer_to_name.bind(this)}
          updateCustomer_to_address={this.updateCustomer_to_address.bind(this)}
          cancel={this.closeModal.bind(this)}
        />
      case 2:
        return <OrderInfo
          nextStep={this.nextStep}
          prevStep={this.prevStep}
          updateOrderInfo={this.updateOrderInfo}
          cancel={this.closeModal.bind(this)}
          updateParcelType={this.updateParcelType.bind(this)}
          value={values}
        />
      case 3:
        return <Confirmation
          prevStep={this.prevStep}
          value={values}
          cancel={this.closeModal.bind(this)}
          prevStep={this.prevStep}
        />
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
            Add New Order
          </Typography>
        </DialogTitle>
        {this.section()}
      </Dialog>
    )
  }
}
