import React, { useEffect, useGlobal } from 'reactn';
import { MyHeader, MyTable } from '../../Components';
import { User } from '../../utils/http';
import PickupForm from './PickupForm';
import DeliveryForm from './DeliveryForm';

function CustomerView() {
  const [user, setUser] = useGlobal('user');
  // Component did mount in stateful component
  useEffect(() => {
    // TODO: Get the correct user id.
    // User.getMyDeliveries(user.id).then(async res => {
    //   console.log(res.data);
    //   await setUser({
    //     ...res.data,
    //     roles: ['Customer', 'Driver'],
    //     role: 'Customer'
    //   });
    // });
  }, []);

  const MyDeliveries = () => {
    console.log(user);
    if (user.Deliveries) {
      if (user.Deliveries.length !== 0) {
        console.log(user.Deliveries);
        return <MyTable data={user.Deliveries} />;
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
