import React, { useGlobal } from 'reactn';
import { Redirect } from 'react';
import { MySwitch } from '../Components';
import CustomerView from './CustomerView';
import DriverView from './DriverView';

function HomeView(props) {
  console.log(props);
  // Get user global state data.
  const [user, setUser] = useGlobal('user');

  const userHasDriverRole = user.driverDetails != null;

  const switchUserMode = () => {
    if (user.role === 'Customer') {
      setUser({ ...user, role: 'Driver' });
    } else {
      setUser({ ...user, role: 'Customer' });
    }
  };

  return (
    <div>
      <MySwitch
        label={user.role}
        onChange={switchUserMode}
        visible={userHasDriverRole}
      />
      {/* <Route path="/driver" component={DriverView} />
      <Route path="/customer" component={CustomerView} /> */}
      {user.role === 'Customer' && <CustomerView props={props} />}
      {user.role === 'Driver' && <DriverView props={props} />}
    </div>
  );
}

export default HomeView;
