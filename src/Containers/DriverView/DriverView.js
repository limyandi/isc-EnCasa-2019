import React, { useEffect, useGlobal } from 'reactn';
import { Delivery } from '../../utils/http';
import { MyHeader, MyTable } from '../../Components';

function DriverView() {
  const [user, setUser] = useGlobal('user');
  const [unassignedDeliveries, setUnassignedDeliveries] = React.useState([]);
  useEffect(() => {
    Delivery.getUnassignedDeliveries(user.ID).then(res => {
      setUnassignedDeliveries(res.data.deliveries);
    });
  }, [user.ID]);

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
