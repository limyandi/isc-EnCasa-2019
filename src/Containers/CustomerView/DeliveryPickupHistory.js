import React, { useEffect, useGlobal } from 'reactn';
import { withRouter } from 'react-router-dom';
import { User, Delivery, Pickup } from '../../utils/http';
import { MyHeader, MyTable } from '../../Components';

function DeliveryPickupHistory() {
  const [user] = useGlobal('user');
  const [pastDeliveriesRequest, setPastDeliveriesRequest] = React.useState(
    undefined
  );
  const [pastPickupsRequest, setPastPickupsRequest] = React.useState(undefined);
  useEffect(() => {
    Delivery.getPastDeliveriesRequest(user.ID, 0).then(res => {
      if (res.data.deliveries) {
        setPastDeliveriesRequest(res.data.deliveries);
      }
    });
    Pickup.getPastPickupsRequest(user.ID, 0).then(res => {
      if (res.data.pickups) {
        setPastPickupsRequest(res.data.pickups);
      }
    });
  }, [user.ID]);

  const MyPastDeliveries = () => {
    if (pastDeliveriesRequest) {
      if (pastDeliveriesRequest.length !== 0) {
        return <MyTable data={pastDeliveriesRequest} />;
      }
    }
    return null;
  };

  const MyPastPickups = () => {
    if (pastPickupsRequest) {
      if (pastPickupsRequest.length !== 0) {
        return <MyTable data={pastPickupsRequest} />;
      }
    }
    return null;
  };
  return (
    <div>
      <MyHeader>Past Delivery</MyHeader>
      <MyPastDeliveries />
      <MyHeader>Past Pickup</MyHeader>
      <MyPastPickups />
    </div>
  );
}

export default withRouter(DeliveryPickupHistory);
