import React, { useEffect, useGlobal } from 'reactn';
import { Grid } from '@material-ui/core';
import { MyTable, MyHeader, MyCardTemplate } from '../../Components';
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
            <MyHeader>Accepted Ongoing Deliveries</MyHeader>
            <MyTable data={acceptedDeliveriesRequest} />
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
            <MyHeader>Accepted Ongoing Pickups</MyHeader>
            <MyTable data={acceptedPickupsRequest} />
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <Grid container spacing={1}>
          <Grid item>
            <MyCardTemplate />
          </Grid>
          <Grid item>
            <MyCardTemplate />
          </Grid>
          <Grid item>
            <MyCardTemplate />
          </Grid>
          <Grid item>
            <MyCardTemplate />
          </Grid>
          <Grid item>
            <MyCardTemplate />
          </Grid>
          <Grid item>
            <MyCardTemplate />
          </Grid>
          <Grid item>
            <MyCardTemplate />
          </Grid>
        </Grid>
      </div>

      <MyAcceptedDeliveries />
      <MyAcceptedPickupRequest />
      <div />
    </div>
  );
}

export default AcceptedDeliveryPickupRequestView;
