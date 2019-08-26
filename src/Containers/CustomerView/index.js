import React, { useEffect, useGlobal } from 'reactn';
import { MyHeader, MyTable } from '../../Components';
import { getMyDeliveries } from '../../utils/http';
import PickupForm from './PickupForm';
import DeliveryForm from './DeliveryForm';

function CustomerView() {
  const [deliveries, setDeliveries] = useGlobal('deliveries');
  // Component did mount in stateful component
  useEffect(() => {
    // TODO: Get the correct user id.
    getMyDeliveries(1).then(async res => {
      await setDeliveries(res.data);
    });
  }, []);

  const MyDeliveries = () => {
    if (deliveries.length !== 0 && deliveries) {
      console.log(deliveries);
      return <MyTable data={deliveries} />;
    }

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
