import React, { useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Add as AddIcon, Edit as EditIcon } from '@material-ui/icons';
import {
  MyHeader,
  MyFloatingActionButton,
  MyFormDialog,
  MyUseForm
} from '../Components';
import { getMyDeliveries, addDelivery } from '../utils/http';

const PickupForm = () => {
  const [open, setOpen] = React.useState(false);

  const { values, handleChange, handleSubmit } = MyUseForm({
    initialValues: {
      deliverySlip: '',
      date: '',
      time: '',
      pickupLocation: ''
    },

    onSubmit(val, errors) {
      alert(JSON.stringify({ val, errors }, null, 2));
      // console.log(val.values);
      // posting delivery here
      // Create a new delivery with a status = 0,
      // the delivery is unassigned to any driver
    },

    validate(val) {
      const errors = {};
      if (val.deliverySlip === '') {
        errors.deliverySlip = 'Please enter the receiving address';
      }
      return errors;
    }
  });

  const openPickupForm = () => {
    setOpen(true);
  };
  const pickupForm = {
    dialogTitle: 'Pickup Form',
    dialogText: 'Add the pickup details!',
    handleConfirm: e => {
      handleSubmit(e);
      setOpen(false);
      // implementation for confirming delivery
    },
    handleClose: () => {
      setOpen(false);
    }
  };
  return (
    <div>
      <MyFloatingActionButton onClick={openPickupForm}>
        <AddIcon />
      </MyFloatingActionButton>
      <MyFormDialog
        open={open}
        handleClose={pickupForm.handleClose}
        handleSubmit={pickupForm.handleConfirm}
        dialogTitle={pickupForm.dialogTitle}
        dialogText={pickupForm.dialogText}
      >
        <form>
          <TextField
            value={values.deliverySlip}
            name="deliverySlip"
            label="Delivery Slip"
            onChange={handleChange}
            autoFocus
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
    </div>
  );
};

const DeliveryForm = () => {
  const [open, setOpen] = React.useState(false);

  const { values, handleChange, handleSubmit } = MyUseForm({
    initialValues: {
      receivingAddress: '',
      date: '',
      time: '',
      pickupLocation: ''
    },

    onSubmit(val, errors) {
      // alert(JSON.stringify({ val, errors }, null, 2));
      // console.log(val.values);
      // posting delivery here
      // Create a new delivery with a status = 0,
      // the delivery is unassigned to any driver
      if (!errors) {
        addDelivery({ ...val.values, status: 0 }).then(res => console.log(res));
      }
    },

    validate(val) {
      const errors = {};
      if (val.receivingAddress === '') {
        errors.receivingAddress = 'Please enter the receiving address';
      }
      return errors;
    }
  });

  const openDeliveryForm = () => {
    setOpen(true);
  };
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
  return (
    <div>
      <MyFloatingActionButton onClick={openDeliveryForm}>
        <EditIcon />
      </MyFloatingActionButton>
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
            autoFocus
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
    </div>
  );
};

function CustomerView() {
  // Component did mount in stateful component
  useEffect(() => {
    // TODO: Get the correct user id.
    getMyDeliveries(1).then(res => console.log(res));
  }, []);

  return (
    <div>
      <MyHeader>Your delivery - Customer View</MyHeader>
      <PickupForm />
      <DeliveryForm />
      <div />
    </div>
  );
}

export default CustomerView;
