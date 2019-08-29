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
    //

    return null;
  };

  return (
    <div>
      <MyHeader>Your delivery</MyHeader>
      <MyDeliveries />
      <MyHeader>Your pickup request</MyHeader>
      <PickupForm />
      <DeliveryForm />
      <div />
    </div>
  );
}

export default CustomerView;
