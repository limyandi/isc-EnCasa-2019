import React, { useEffect, useGlobal } from 'reactn';
import { withRouter } from 'react-router-dom';
import { TextField, Grid } from '@material-ui/core';
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Delivery, Job, User, Pickup, sendEmail } from '../../utils/http';
import { MyHeader, MyTable, MyFormDialog } from '../../Components';

function DriverView() {
  const [user] = useGlobal('user');

  const [unassignedDeliveries, setUnassignedDeliveries] = React.useState([]);
  const [unassignedPickups, setUnassignedPickups] = React.useState([]);
  useEffect(() => {
    Delivery.getUnassignedDeliveries(user.ID).then(res => {
      setUnassignedDeliveries(res.data.deliveries);
    });
    Pickup.getUnassignedPickups(user.ID).then(res => {
      setUnassignedPickups(res.data.pickups);
    });
  }, [user.ID]);

  const [deliveryData, setDeliveryData] = React.useState(undefined);
  const [ETA, setETA] = React.useState(new Date());
  const [deliveryFormOpen, setDeliveryFormOpen] = React.useState(false);

  const postNewDeliveryForm = {
    dialogTitle: 'Indicate the estimated time you will arrive',
    dialogText:
      deliveryData &&
      `Ensure that the time you input is within the time range (${deliveryData.time}-${deliveryData.timeTo})`,
    handleConfirm: e => {
      // implementation for confirming adding new delivery job.
      Job.addJob({ deliveryId: deliveryData.ID, driverId: user.ID, ETA })
        .then(res => {
          sendEmail.sendJobNotification({
            destinations: [deliveryData.customerEmail],
            subject: 'Accepted delivery request',
            textBody: `Your delivery request ${deliveryData.ID} has been accepted by ${user.name}. His estimated arrival time is on ${ETA}`
          });
          setUnassignedDeliveries(
            unassignedDeliveries.filter(i => i.ID !== deliveryData.ID)
          );
        })
        .then(() => setDeliveryFormOpen(false));
    },
    handleClose: () => {
      setDeliveryFormOpen(false);
    }
  };

  const handleAddDeliveriesOnClick = data => {
    setDeliveryFormOpen(true);
    setETA(moment(data.time, 'HH:mm'));
    setDeliveryData(data);
  };

  const handleAddPickupsOnClick = data => {
    Job.addJob({ pickupId: data.ID, driverId: user.ID }).then(res => {
      setUnassignedPickups(unassignedPickups.filter(i => i.ID !== data.ID));
    });
  };

  return (
    <div>
      <MyHeader>Unassigned Job</MyHeader>
      <div>Deliveries</div>
      {unassignedDeliveries.length !== 0 && (
        <MyTable
          addOnClick={handleAddDeliveriesOnClick}
          addable
          data={unassignedDeliveries}
        />
      )}
      <MyFormDialog
        open={deliveryFormOpen}
        handleClose={postNewDeliveryForm.handleClose}
        handleSubmit={postNewDeliveryForm.handleConfirm}
        dialogTitle={postNewDeliveryForm.dialogTitle}
        dialogText={postNewDeliveryForm.dialogText}
      >
        <form>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardTimePicker
                margin="normal"
                id="time-from"
                label="Estimated Time Arrival"
                value={ETA}
                minutesStep={15}
                onChange={selectedTime => setETA(selectedTime)}
                KeyboardButtonProps={{
                  'aria-label': 'change time'
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </form>
      </MyFormDialog>
      <div>Pickups</div>
      {unassignedPickups.length !== 0 && (
        <MyTable
          addOnClick={handleAddPickupsOnClick}
          addable
          data={unassignedPickups}
        />
      )}
    </div>
  );
}

export default withRouter(DriverView);
