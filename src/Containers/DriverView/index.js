import React, { useEffect, useGlobal } from 'reactn';
import { withRouter } from 'react-router-dom';
import { Grid, Typography, Button } from '@material-ui/core';
import { User, Job, Pickup } from '../../utils/http';
import { MyHeader, MyTable, MyCardTemplate, MyTooltip } from '../../Components';

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

  const handlePickupJobOnClick = pickupID => {
    Job.updateJobStatus(pickupID).then(() => {
      setMyDeliveryJobs(myPickupJobs.filter(pickup => pickup.ID !== pickupID));
    });
  };

  const MyDeliveryJobs = () => {
    if (myDeliveryJobs && myDeliveryJobs.length !== 0) {
      return (
        <div>
          <div>
            Delivery Jobs
            <MyTooltip
              label="This is the delivery job that you have accepted, Do not forget to mark it as completed when it is done. Delivery job refers to a job where you (as a driver) have to pickup an item from a designated customer address and then send it to a dispatch centre"
              placement="right"
            />
          </div>
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
        </div>
      );
    }
    return null;
  };

  const MyPickupJobs = () => {
    if (myPickupJobs && myPickupJobs.length !== 0) {
      return (
        <div>
          <div>
            Pickup Jobs
            <MyTooltip
              label="This is the pickup job that you have accepted, Do not forget to mark it as completed when it is done. A pickup job refers to a job where you (as a driver) have to pickup and item from a dispatch centre and then send it to designated customer pickup address."
              placement="right"
            />
          </div>
          <Grid container spacing={2}>
            {myPickupJobs.map(pickup => {
              return (
                <Grid item>
                  <MyCardTemplate
                    actionText="Mark as Completed"
                    actionOnClick={() => handlePickupJobOnClick(pickup.ID)}
                  >
                    <Typography color="textSecondary" gutterBottom>
                      Job ID: {pickup.ID}
                      <br />
                      Customer Details
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {pickup.customerName}
                    </Typography>
                    <Typography color="textSecondary">
                      Phone Number: {pickup.customerPhoneNumber}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Customer Available Date Time Range: <br />
                      {pickup.date} ({pickup.time} - {pickup.timeTo})
                      <br />
                      Pickup Address: {pickup.pickupAddress}
                    </Typography>
                    <Button
                      onClick={() =>
                        Pickup.deliverySlipFileRequest(
                          pickup.deliverySlipID
                        ).then(res => {
                          window.open(res.data.DownloadLink, '_blank');
                        })
                      }
                    >
                      Open/Download Delivery Slip
                    </Button>
                  </MyCardTemplate>
                </Grid>
              );
            })}
          </Grid>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <MyHeader>My Job</MyHeader>
      <MyDeliveryJobs />
      <div style={{ marginTop: 20 }} />
      <MyPickupJobs />
    </div>
  );
}

export default withRouter(DriverView);
