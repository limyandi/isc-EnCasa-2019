import React, { useEffect, useGlobal } from 'reactn';
import { MyHeader, MyTable } from '../../Components';
import { User } from '../../utils/http';
import PickupForm from './PickupForm';
import DeliveryForm from './DeliveryForm';

function CustomerView(props) {
  const [user, setUser] = useGlobal('user');

  const MyDeliveries = () => {
    if (user.deliveries) {
      if (user.deliveries.length !== 0) {
        return <MyTable data={user.deliveries} />;
      }
    }

    return null;
  };

  const MyPickupRequest = () => {
    if (user.pickups) {
      if (user.pickups.length !== 0) {
        return <MyTable data={user.pickups} />;
      }
    }
    return null;
  };

  return (
    <div>
      <DeliveryForm />
      <MyDeliveries />
      <div style={{ margin: 20 }} />
      <PickupForm />
      <MyPickupRequest />
      <div />
    </div>
  );
}

export default CustomerView;
