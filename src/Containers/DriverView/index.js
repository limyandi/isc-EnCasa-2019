import React, { useEffect, useGlobal } from 'reactn';
import { Delivery } from '../../utils/http';
import { MyHeader, MyTable } from '../../Components';
import MyHyperLink from '../../Components/Hyperlink';

function DriverView(props) {
  const [user, setUser] = useGlobal('user');

  const [unassignedDeliveries, setUnassignedDeliveries] = React.useState([]);
  useEffect(() => {
    Delivery.getUnassignedDeliveries(user.ID).then(res => {
      console.log(res.data);
      setUnassignedDeliveries(res.data.deliveries);
    });
  }, []);

  console.log(unassignedDeliveries);

  return (
    <div>
      <div>Driver view!</div>
      <MyHeader>Unassigned Deliveries</MyHeader>
      {unassignedDeliveries.length !== 0 && (
        <MyTable data={unassignedDeliveries} />
      )}
      <MyHyperLink to={`${props.match.url}/settings`}>
        Already have an account? Login!
      </MyHyperLink>
    </div>
  );
}

export default DriverView;
