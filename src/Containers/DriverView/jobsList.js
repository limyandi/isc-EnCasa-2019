import React, { useEffect, useGlobal } from 'reactn';
import { withRouter } from 'react-router-dom';
import { TextField, Grid } from '@material-ui/core';
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Job, sendEmail } from '../../utils/http';
import { MyHeader, MyTable, MyFormDialog } from '../../Components';

function DriverView() {
  const [user] = useGlobal('user');

  const [unassignedDeliveries, setUnassignedDeliveries] = React.useState([]);
  const [unassignedPickups, setUnassignedPickups] = React.useState([]);
  useEffect(() => {
    Job.getUnassignedJobs(user.ID).then(res => {
      setUnassignedDeliveries(res.data.deliveries);
      setUnassignedPickups(res.data.pickups);
    });
  }, [user.ID]);

  const [jobData, setJobData] = React.useState(undefined);
  const [ETA, setETA] = React.useState(new Date());
  const [jobFormOpen, setJobFormOpen] = React.useState(false);

  const postNewJobForm = {
    dialogTitle: 'Indicate the estimated time you will arrive',
    dialogText:
      jobData &&
      `Ensure that the time you input is within the time range (${jobData.time}-${jobData.timeTo})`,
    handleConfirm: e => {
      const jobTypeId = `${jobData.type}Id`;
      // implementation for confirming adding new delivery job.
      Job.addJob({ [jobTypeId]: jobData.ID, driverId: user.ID, ETA })
        .then(res => {
          sendEmail.sendJobNotification({
            destinations: [jobData.customerEmail],
            subject: `Accepted ${jobData.type} request`,
            textBody: `Your ${jobData.type} request ${jobData.ID} has been accepted by ${user.name}. Estimated arrival time is on ${ETA}`
          });
          // eslint-disable-next-line no-unused-expressions
          jobData.type === 'delivery'
            ? setUnassignedDeliveries(
                unassignedDeliveries.filter(i => i.ID != jobData.ID)
              )
            : setUnassignedPickups(
                unassignedPickups.filter(i => i.ID != jobData.ID)
              );
        })
        .then(() => setJobFormOpen(false));
    },
    handleClose: () => {
      setJobFormOpen(false);
    }
  };

  const handleAddDeliveriesOnClick = data => {
    setJobFormOpen(true);
    setETA(moment(data.time, 'HH:mm'));
    setJobData({ ...data, type: 'delivery' });
  };

  const handleAddPickupsOnClick = data => {
    setJobFormOpen(true);
    setETA(moment(data.time, 'HH:mm'));
    setJobData({ ...data, type: 'pickup' });
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
        open={jobFormOpen}
        handleClose={postNewJobForm.handleClose}
        handleSubmit={postNewJobForm.handleConfirm}
        dialogTitle={postNewJobForm.dialogTitle}
        dialogText={postNewJobForm.dialogText}
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
