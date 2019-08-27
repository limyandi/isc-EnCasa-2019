import React, { useGlobal } from 'reactn';
import { TextField } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import moment from 'moment';
import {
  MyFloatingActionButton,
  MyFormDialog,
  MyUseForm,
  MyDatePicker,
  MyTimePicker
} from '../../Components';
import { User } from '../../utils/http';

const DeliveryForm = () => {
  const [user, setUser] = useGlobal('user');
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(new Date());

  // TODO: Set Date not working.
  const handleDateChange = selectedDate => {
    setDate(selectedDate);
  };

  const { values, handleChange, handleSubmit } = MyUseForm({
    initialValues: {
      fromaddress: '',
      pickuplocation: ''
    },

    onSubmit(val, errors) {
      // alert(JSON.stringify({ val, errors }, null, 2));
      // console.log(val.values);
      // posting delivery here
      // Create a new delivery with a status = 0,
      // the delivery is unassigned to any driver
      if (!errors) {
        User.addDelivery({
          ...val.values,
          date: moment(date).format('MM-DD-YYYY'),
          time: moment(date).format('HH:mm:ss'),
          status: 0,
          customerid: user.ID
        }).then(res => console.log(res));
      }
    },

    validate(val) {
      const errors = {};
      if (val.fromaddress === '') {
        errors.fromaddress = 'Please enter the from address';
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
            name="fromaddress"
            label="Address To"
            onChange={handleChange}
            autoFocus
          />
          <MyDatePicker name="date" value={date} onChange={handleDateChange} />
          <MyTimePicker name="date" value={date} onChange={handleDateChange} />
          <TextField
            value={values.pickupLocation}
            name="pickuplocation"
            label="Pickup Location"
            onChange={handleChange}
          />
        </form>
      </MyFormDialog>
    </div>
  );
};

export default DeliveryForm;
