import React, { useEffect, useGlobal } from 'reactn';
import { Delivery } from '../../utils/http';
import { MyHeader, MyTable } from '../../Components';

function DriverView() {
  const [user, setUser] = useGlobal('user');

  console.log(user.driverDetails);

  // TODO: Availability Settings - Time Range
  // TODO: Notification settings - with checkbox
  return (
    <div>
      <div>Driver view!</div>
      <MyHeader>Driver Settings</MyHeader>
      <div>Availability Settings</div>
      <div>Notification Settings</div>
    </div>
  );
}

export default DriverView;
