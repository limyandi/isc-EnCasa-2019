import React, { useEffect, useGlobal } from 'reactn';
import { Grid, Typography } from '@material-ui/core';
import { MyTable, MyHeader, MyCardTemplate, MyTooltip } from '../../Components';
import { Delivery, Pickup } from '../../utils/http';

function AcceptedDeliveryPickupRequestView() {
  const [user] = useGlobal('user');

  const [
    acceptedDeliveriesRequest,
    setAcceptedDeliveriesRequest
  ] = React.useState(undefined);
  const [acceptedPickupsRequest, setAcceptedPickupsRequest] = React.useState(
    undefined
  );

  useEffect(() => {
    Delivery.getCurrentDeliveriesRequest(user.ID, 1).then(res => {
      if (res.data.deliveries) {
        setAcceptedDeliveriesRequest(res.data.deliveries);
      }
    });
    Pickup.getCurrentPickupsRequest(user.ID, 1).then(res => {
      if (res.data.pickups) {
        setAcceptedPickupsRequest(res.data.pickups);
      }
    });
  }, [user.ID]);

  const MyAcceptedDeliveries = () => {
    if (acceptedDeliveriesRequest) {
      if (acceptedDeliveriesRequest.length !== 0) {
        return (
          <div>
            <div style={{ display: 'flex' }}>
              <MyHeader>Accepted Ongoing Deliveries</MyHeader>
              <MyTooltip
                label="This is the list of your accepted delivery request (getting driver to deliver your things to your selected destination address via dispatch centre)"
                placement="right"
              />
            </div>
            {/* <MyTable data={acceptedDeliveriesRequest} /> */}
            <Grid container spacing={2}>
              {acceptedDeliveriesRequest.map(delivery => {
                return (
                  <Grid item>
                    <MyCardTemplate actionText="Chat with Driver">
                      <Typography color="textSecondary" gutterBottom>
                        Delivery ID: {delivery.ID}
                        <br />
                        Driver Details
                      </Typography>
                      <Typography variant="h5" component="h2">
                        {delivery.driverName}
                      </Typography>
                      <Typography color="textSecondary">
                        {delivery.driverPhoneNumber}
                      </Typography>
                      <Typography variant="body2" component="p">
                        Estimated Arrival: {delivery.date} ({delivery.ETA})
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
    }
    return null;
  };

  const MyAcceptedPickupRequest = () => {
    if (acceptedPickupsRequest) {
      if (acceptedPickupsRequest.length !== 0) {
        return (
          <div>
            <div style={{ display: 'flex' }}>
              <MyHeader>Accepted Ongoing Pickups</MyHeader>
              <MyTooltip
                label="This is the list of your accepted pickup request (getting things delivered to your place)"
                placement="right"
              />
            </div>
            {/* <MyTable data={acceptedPickupsRequest} /> */}
            <Grid container spacing={2}>
              {acceptedPickupsRequest.map(pickup => {
                return (
                  <Grid item>
                    <MyCardTemplate actionText="Chat with Driver">
                      <Typography color="textSecondary" gutterBottom>
                        Delivery ID: {pickup.ID}
                        <br />
                        Driver Details
                      </Typography>
                      <Typography variant="h5" component="h2">
                        {pickup.driverName}
                      </Typography>
                      <Typography color="textSecondary">
                        {pickup.driverPhoneNumber}
                      </Typography>
                      <Typography variant="body2" component="p">
                        Estimated Arrival: {pickup.date} ({pickup.ETA})
                        <br />
                        Pickup Address: {pickup.pickupAddress}
                      </Typography>
                    </MyCardTemplate>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div>
      <MyAcceptedDeliveries />
      <MyAcceptedPickupRequest />
    </div>
  );
}

export default AcceptedDeliveryPickupRequestView;
