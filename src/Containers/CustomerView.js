import React, { useEffect } from 'react';
import { TextField } from '@material-ui/core';
import {
  MyHeader,
  MyFloatingActionButton,
  MyFormDialog,
  MyUseForm
} from '../Components';
import { getMyDeliveries } from '../utils/http';

function CustomerView() {
  const [open, setOpen] = React.useState(false);

  // Component did mount in stateful component
  useEffect(() => {
    // TODO: Get the correct user id.
    getMyDeliveries(1).then(res => console.log(res));
  }, []);

  const { values, handleChange, handleSubmit } = MyUseForm({
    initialValues: {
      receivingAddress: '',
      date: '',
      time: '',
      pickupLocation: ''
    },

    onSubmit(val, errors) {
      // posting delivery here
      alert(JSON.stringify({ val, errors }, null, 2));
    },

    validate(val) {
      const errors = {};
      if (val.receivingAddress === '') {
        errors.receivingAddress = 'Please enter the receiving address';
      }
      return errors;
    }
  });

  const deliveryForm = {
    dialogTitle: 'Deliver',
    dialogText: 'Add the delivery details!',
    handleConfirm: e => {
      handleSubmit(e);
      setOpen(false);
      // implementation for confirming delivery
    },
    handleClose: () => {
      setOpen(false);
    }
  };

  const addDelivery = () => {
    setOpen(true);
  };

  return (
    <div>
      <MyHeader>Your delivery - Customer View</MyHeader>
      <MyFloatingActionButton onClick={addDelivery} />
      <MyFormDialog
        open={open}
        handleClose={deliveryForm.handleClose}
        handleSubmit={deliveryForm.handleConfirm}
        dialogTitle={deliveryForm.dialogTitle}
        dialogText={deliveryForm.dialogText}
      >
        <form>
          <TextField
            value={values.receivingAddress}
            name="receivingAddress"
            label="Address To"
            onChange={handleChange}
          />
          <TextField
            value={values.date}
            name="date"
            label="Date"
            onChange={handleChange}
          />
          <TextField
            value={values.time}
            name="time"
            label="Time"
            onChange={handleChange}
          />
          <TextField
            value={values.pickupLocation}
            name="pickupLocation"
            label="Pickup Location"
            onChange={handleChange}
          />
        </form>
      </MyFormDialog>
      <div />
    </div>
  );
}

export default CustomerView;
