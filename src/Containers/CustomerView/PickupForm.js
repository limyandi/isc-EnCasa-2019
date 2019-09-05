import React, { useGlobal } from 'reactn';
import moment from 'moment';
import { TextField } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker
} from '@material-ui/pickers';
import {
  MyFloatingActionButton,
  MyFormDialog,
  MyUseForm,
  MyCheckbox,
  MyHeader
} from '../../Components';
import { Pickup, User, sendEmail, sendSMS } from '../../utils/http';
import {
  textSMSSenderId,
  newPickupTextBody,
  newPickupEmailSubject
} from '../../helper/textMessage';

const PickupForm = () => {
  const [user, setUser] = useGlobal('user');
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [dateTo, setDateTo] = React.useState(date);

  const handleDateChange = selectedDate => {
    setDate(selectedDate);
    setDateTo(selectedDate);
  };

  const handleDateToChange = selectedDate => {
    if (selectedDate > date) {
      setDateTo(selectedDate);
    }
  };

  const { values, handleChange, handleSubmit } = MyUseForm({
    initialValues: {
      pickupLocation: '',
      agreement: ''
    },

    onSubmit(val) {
      // and add a new driverDetails object to pickup
      const time = moment(date).format('HH:mm');
      const timeTo = moment(dateTo).format('HH:mm');
      Pickup.addPickup({
        ...val.values,
        date: moment(date).format('YYYY-MM-DD'),
        time,
        timeTo,
        customerId: user.ID
      }).then(res => {
        setUser({
          ...user,
          pickups: user.pickups
            ? [...user.pickups, { ...res.data }]
            : [res.data]
        });
        User.getDriversSubscriptedEmail(val.values.communityID, user.ID).then(
          result => {
            sendEmail.sendJobNotification({
              destinations: result.data.emails,
              subject: newPickupEmailSubject,
              textBody: newPickupTextBody(user, date, time, timeTo)
            });
          }
        );
        User.getDriversSubscriptedSMS(val.values.communityID, user.ID).then(
          result => {
            sendSMS.sendJobNotification({
              to: result.data.phoneNumber,
              senderId: textSMSSenderId,
              messageText: newPickupTextBody(user, date, time, timeTo)
            });
          }
        );
      });
    },

    validate(val) {
      const errors = {};
      if (val.deliverySlip === '') {
        errors.deliverySlip = 'Please upload the delivery slip';
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
    },
    handleClose: () => {
      setOpen(false);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <MyHeader>Your Pickup request</MyHeader>
      <MyFloatingActionButton onClick={openPickupForm}>
        <AddIcon />
      </MyFloatingActionButton>
      <MyFormDialog
        open={open}
        handleClose={pickupForm.handleClose}
        handleSubmit={pickupForm.handleConfirm}
        dialogTitle={pickupForm.dialogTitle}
        dialogText={pickupForm.dialogText}
        disableConfirmButton={!values.agreement}
      >
        <form>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date"
                format="MM-dd-yyyy"
                value={date}
                //   inputProps={{ name: 'date' }}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
                disablePast
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container>
              <KeyboardTimePicker
                margin="normal"
                id="time-from"
                label="Time from"
                value={date}
                minutesStep={15}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time'
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container>
              <KeyboardTimePicker
                margin="normal"
                id="time-to"
                label="Time to"
                value={dateTo}
                minutesStep={15}
                onChange={handleDateToChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time'
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <TextField
            value={values.pickupLocation}
            name="pickupLocation"
            label="Pickup Address"
            onChange={handleChange}
            style={{ marginBottom: 20 }}
          />
          <MyCheckbox
            name="agreement"
            onChange={handleChange}
            value={values.agreement}
            label="By clicking confirm, you provided us the authority to pickup the item"
          />
        </form>
      </MyFormDialog>
    </div>
  );
};

export default PickupForm;
