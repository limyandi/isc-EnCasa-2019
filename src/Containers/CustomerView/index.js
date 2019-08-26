import React, { useEffect, useGlobal } from 'reactn';
import { MyHeader } from '../../Components';
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
    console.log(deliveries);
    return (
      <div>
        {deliveries.map((delivery, index) => (
          <div key={index}>{delivery.fromAddress}</div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <MyHeader>Your delivery - Customer View</MyHeader>
      <MyDeliveries />
      <PickupForm />
      <DeliveryForm />
      <div />
    </div>
  );
}

export default CustomerView;
