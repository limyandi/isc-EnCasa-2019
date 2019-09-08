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
            {/* <MyTable data={acceptedDeliveriesRequest} /> */}
            <Grid container spacing={2}>
              {acceptedDeliveriesRequest.map(delivery => {
                return (
                  <Grid item>
                    <MyCardTemplate object={delivery} />
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
            <MyHeader>Accepted Ongoing Pickups</MyHeader>
            {/* <MyTable data={acceptedPickupsRequest} /> */}
            <Grid container spacing={2}>
              {acceptedPickupsRequest.map(pickup => {
                return (
                  <Grid item>
                    <MyCardTemplate object={pickup} />
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
      {/* <Grid container spacing={2}>
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
      </Grid> */}

      <MyAcceptedDeliveries />
      <MyAcceptedPickupRequest />
      <div />
    </div>
  );
}

export default AcceptedDeliveryPickupRequestView;
