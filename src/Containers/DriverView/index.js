import React, { useEffect, useGlobal } from 'reactn';
import { withRouter } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
import { User, Job } from '../../utils/http';
import { MyHeader, MyTable, MyCardTemplate } from '../../Components';

function DriverView() {
  const [user] = useGlobal('user');

  const [myDeliveryJobs, setMyDeliveryJobs] = React.useState([]);
  const [myPickupJobs, setMyPickupJobs] = React.useState([]);

  useEffect(() => {
    User.getMyIncompleteJobs(user.ID).then(res => {
      // const jobs = [res.data.jobs.map(job => job.deliveries)];
      // check if the jobs exist
      if (res.data) {
        const deliveryJobs = [...res.data.deliveries.map(delivery => delivery)];
        setMyDeliveryJobs(deliveryJobs);
        const pickupJobs = [...res.data.pickups.map(pickup => pickup)];
        setMyPickupJobs(pickupJobs);
      }
    });
  }, [user.ID]);

  const handleDeliveryJobOnClick = deliveryID => {
    Job.updateJobStatus(deliveryID).then(() => {
      setMyDeliveryJobs(
        myDeliveryJobs.filter(delivery => delivery.ID !== deliveryID)
      );
    });
  };

  const MyDeliveryJobs = () => {
    if (myDeliveryJobs && myDeliveryJobs.length !== 0) {
      return (
        <Grid container spacing={2}>
          {myDeliveryJobs.map(delivery => {
            return (
              <Grid item>
                <MyCardTemplate
                  actionText="Mark as Completed"
                  actionOnClick={() => handleDeliveryJobOnClick(delivery.ID)}
                >
                  <Typography color="textSecondary" gutterBottom>
                    Job ID: {delivery.ID}
                    <br />
                    Customer Details
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {delivery.customerName}
                  </Typography>
                  <Typography color="textSecondary">
                    Phone Number: {delivery.customerPhoneNumber}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Customer Available Date Time Range: <br />
                    {delivery.date} ({delivery.time} - {delivery.timeTo})
                    <div>Delivery Address: {delivery.deliveryAddress}</div>
                    <br />
                    Pickup Address: {delivery.pickupAddress}
                  </Typography>
                </MyCardTemplate>
              </Grid>
            );
          })}
        </Grid>
      );
    }
    return null;
  };

  const MyPickupJobs = () => {
    if (myPickupJobs && myPickupJobs.length !== 0) {
      return (
        <Grid container spacing={2}>
          {myPickupJobs.map(pickup => {
            return (
              <Grid item>
                <MyCardTemplate actionText="Mark as Completed">
                  <Typography color="textSecondary" gutterBottom>
                    Job ID: {pickup.ID}
                    <br />
                    Customer Details
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {pickup.customerName}
                  </Typography>
                  <Typography color="textSecondary">
                    {pickup.customerPhoneNumber}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Customer Available Date Time Range: <br />
                    {pickup.date} ({pickup.time} - {pickup.timeTo})
                    <br />
                    Pickup Address: {pickup.pickupAddress}
                  </Typography>
                </MyCardTemplate>
              </Grid>
            );
          })}
        </Grid>
      );
    }
    return null;
  };

  return (
    <div>
      <MyHeader>My Job</MyHeader>
      <div>Delivery Jobs</div>
      <MyDeliveryJobs />
      <div>Pickup Jobs</div>
      <MyPickupJobs />
    </div>
  );
}

export default withRouter(DriverView);
