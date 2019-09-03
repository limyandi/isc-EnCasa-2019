import React, { useGlobal } from 'reactn';
import { TextField } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import moment from 'moment';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker
} from '@material-ui/pickers';
import { Delivery, User, sendEmail, DispatchCentre } from '../../utils/http';
import {
  MyFloatingActionButton,
  MyFormDialog,
  MyUseForm,
  MyHeader,
  MySingleDropdown
} from '../../Components';

const DeliveryForm = () => {
  const [user, setUser] = useGlobal('user');
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [dateTo, setDateTo] = React.useState(date);

  // TODO: Set Date not working.
  const handleDateChange = selectedDate => {
    setDate(selectedDate);
    setDateTo(selectedDate);
  };

  const handleDateToChange = selectedDate => {
    // only change the time if the selected date is later than the date.
    if (selectedDate > date) {
      setDateTo(selectedDate);
    }
  };

  const { values, handleChange, handleSubmit } = MyUseForm({
    initialValues: {
      fromAddress: '',
      pickupLocation: '',
      communityID: undefined,
      dispatchCentreID: undefined
    },

    onSubmit(val, errors) {
      // alert(JSON.stringify({ val, errors }, null, 2));
      // console.log(val.values);
      // posting delivery here
      // Create a new delivery with a status = 0,
      // the delivery is unassigned to any driver
      const time = moment(date).format('HH:mm:ss');
      const timeTo = moment(dateTo).format('HH:mm:ss');
      if (!errors) {
        Delivery.addDelivery({
          ...val.values,
          date: moment(date).format('YYYY-MM-DD'),
          time,
          timeTo,
          status: false,
          customerId: user.ID
        }).then(res => {
          setUser({
            ...user,
            deliveries: user.deliveries
              ? [...user.deliveries, { ...res.data }]
              : [res.data]
          });
          User.getDriversSubscriptedEmail().then(result => {
            sendEmail.sendNewJobNotification({
              destinations: result.data.emails,
              textBody: `A new delivery has been posted: customer: ${user.name} is available at ${date} from ${time}-${timeTo}`
            });
          });
        });
      }
    },

    validate(val) {
      const errors = {};
      if (val.fromAddress === '') {
        errors.fromAddress = 'Please enter the from address';
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

  const [
    communityDispatchCentres,
    setCommunityDispatchCentres
  ] = React.useState([]);
  const setDispatchCentre = communityID => {
    // reset the dispatchcentreID
    values.dispatchCentreID = undefined;
    DispatchCentre.getByCommunity(communityID).then(res => {
      setCommunityDispatchCentres(res.data.dispatchCentres);
    });
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <MyHeader>Your delivery</MyHeader>
      <MyFloatingActionButton onClick={openDeliveryForm}>
        <AddIcon />
      </MyFloatingActionButton>
      <MyFormDialog
        open={open}
        handleClose={deliveryForm.handleClose}
        handleSubmit={deliveryForm.handleConfirm}
        dialogTitle={deliveryForm.dialogTitle}
        dialogText={deliveryForm.dialogText}
      >
        <form>
          <div>
            <TextField
              value={values.receivingAddress}
              name="fromAddress"
              label="Item Delivery Address"
              onChange={handleChange}
              autoFocus
            />
          </div>
          <div>
            <TextField
              value={values.pickupLocation}
              name="pickupLocation"
              label="Item Pickup Address"
              onChange={handleChange}
            />
          </div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Item Pickup Date"
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
            <Grid container justify="space-around">
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
            <Grid container justify="space-around">
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
          <MySingleDropdown
            data={user.communities}
            name="communityID"
            label="Community"
            value={values.communityID}
            onChange={e => {
              handleChange(e);
              // e.target.value to use because sometimes
              // handleChange is not done before setDispatchCentre
              setDispatchCentre(e.target.value);
            }}
          />
          {values.communityID && (
            <MySingleDropdown
              data={communityDispatchCentres}
              name="dispatchCentreID"
              label="Dispatch Centre"
              value={values.dispatchCentreID}
              onChange={handleChange}
              withAddress
            />
          )}
        </form>
      </MyFormDialog>
    </div>
  );
};

export default DeliveryForm;
