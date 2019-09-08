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
import {
  Delivery,
  User,
  sendEmail,
  // DispatchCentre,
  sendSMS
} from '../../utils/http';
import {
  MyFloatingActionButton,
  MyFormDialog,
  MyUseForm,
  MyHeader,
  MySingleDropdown
} from '../../Components';
import {
  newDeliveryTextBody,
  newDeliveryEmailSubject,
  textSMSSenderId
} from '../../helper/textMessage';

const DeliveryForm = () => {
  const [user, setUser] = useGlobal('user');
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [dateTo, setDateTo] = React.useState(moment(date).add(1, 'hours'));

  // TODO: Set Date not working.
  const handleDateChange = selectedDate => {
    setDate(selectedDate);
    setDateTo(moment(selectedDate).add(1, 'hours'));
  };

  const handleDateToChange = selectedDate => {
    // only change the time if the selected date is later than the date.
    if (selectedDate > date) {
      setDateTo(selectedDate);
    }
  };

  const { values, handleChange, handleSubmit } = MyUseForm({
    initialValues: {
      deliveryAddress: '',
      pickupAddress: '',
      communityID: undefined,
      dispatchCentreID: undefined
    },

    onSubmit(val, errors) {
      const time = moment(date).format('HH:mm');
      const timeTo = moment(dateTo).format('HH:mm');
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

          User.getDriversSubscriptedEmail(val.values.communityID, user.ID).then(
            result => {
              sendEmail.sendJobNotification({
                destinations: result.data.emails,
                subject: newDeliveryEmailSubject,
                textBody: newDeliveryTextBody(user, date, time, timeTo)
              });
            }
          );
          User.getDriversSubscriptedSMS(val.values.communityID, user.ID).then(
            result => {
              sendSMS.sendJobNotification({
                // TODO: Dynamic get phone number
                to: result.data.phoneNumber,
                senderId: textSMSSenderId,
                messageText: newDeliveryTextBody(user, date, time, timeTo)
              });
            }
          );
        });
      }
    },

    validate(val) {
      const errors = {};
      if (val.pickupAddress === '') {
        errors.pickupAddress = 'Please enter the from address';
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

  const [deliveryPrice, setDeliveryPrice] = React.useState(undefined);
  const quoteDeliveryPrice = (deliveryAddress, pickupAddress) => {
    return (
      deliveryAddress &&
      pickupAddress &&
      Delivery.quoteDeliveryPrice(deliveryAddress, pickupAddress).then(res => {
        setDeliveryPrice(res.data.price);
      })
    );
  };

  // const [
  //   communityDispatchCentres,
  //   setCommunityDispatchCentres
  // ] = React.useState([]);
  // const setDispatchCentre = communityID => {
  //   // reset the dispatchcentreID
  //   values.dispatchCentreID = undefined;
  //   DispatchCentre.getByCommunity(communityID).then(res => {
  //     setCommunityDispatchCentres(res.data.dispatchCentres);
  //   });
  // };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <MyHeader>Your Delivery Request</MyHeader>
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
              value={values.deliveryAddress}
              name="deliveryAddress"
              label="Item Delivery Address"
              onChange={handleChange}
              autoFocus
            />
          </div>
          <div>
            <TextField
              value={values.pickupAddress}
              name="pickupAddress"
              label="Item Pickup Address"
              onChange={e => {
                handleChange(e);
                quoteDeliveryPrice(
                  values.deliveryAddress,
                  values.pickupAddress
                );
              }}
            />
          </div>
          {deliveryPrice && (
            <div style={{ color: '#3F51B5', marginBottom: 10 }}>
              Price Estimate: {deliveryPrice}
            </div>
          )}
          <MySingleDropdown
            data={user.communities}
            name="communityID"
            label="Community"
            value={values.communityID}
            onChange={e => {
              handleChange(e);
              // e.target.value to use because sometimes
              // handleChange is not done before setDispatchCentre
              // setDispatchCentre(e.target.value);
            }}
          />
          {/* {values.communityID && (
            <MySingleDropdown
              data={communityDispatchCentres}
              name="dispatchCentreID"
              label="Dispatch Centre"
              value={values.dispatchCentreID}
              onChange={handleChange}
              withAddress
            />
          )} */}
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
        </form>
      </MyFormDialog>
    </div>
  );
};

export default DeliveryForm;
