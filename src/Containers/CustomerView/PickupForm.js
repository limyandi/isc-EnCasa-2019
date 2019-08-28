import React from 'reactn';
import { TextField } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import {
  MyFloatingActionButton,
  MyFormDialog,
  MyUseForm,
  MyCheckbox
} from '../../Components';

const PickupForm = () => {
  const [open, setOpen] = React.useState(false);

  const { values, handleChange, handleSubmit } = MyUseForm({
    initialValues: {
      date: '',
      time: '',
      pickupLocation: '',
      agreement: ''
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
            value={values.date}
            name="date"
            label="Date"
            onChange={handleChange}
            autoFocus
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
          <MyCheckbox
            name="agreement"
            onChange={handleChange}
            value={values.agreement}
            label="By clicking confirm, you agreed to provide authority for us to pickup the item"
          />
        </form>
      </MyFormDialog>
    </div>
  );
};

export default PickupForm;
