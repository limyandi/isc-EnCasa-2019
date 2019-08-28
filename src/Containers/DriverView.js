import React, { useEffect } from 'reactn';
import { Delivery } from '../utils/http';
import { MyHeader, MyTable } from '../Components';

function DriverView() {
  const [unassignedDeliveries, setUnassignedDeliveries] = React.useState([]);
  useEffect(() => {
    Delivery.getUnassignedDeliveries().then(res => {
      setUnassignedDeliveries(res.data);
    });
  }, []);

  return (
    <div>
      <div>Driver view!</div>
      <MyHeader>Unassigned Deliveries</MyHeader>
      {unassignedDeliveries.length !== 0 && (
        <MyTable data={unassignedDeliveries} />
      )}
    </div>
  );
}

export default DriverView;
