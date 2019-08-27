import React, { useGlobal } from 'reactn';
import { MySwitch } from '../Components';
import CustomerView from './CustomerView';
import DriverView from './DriverView';

function HomeView() {
  // Get user global state data.
  const [user, setUser] = useGlobal('user');

  // by default, set user mode to customer

  const userHasDriverRole =
    user.roles != null ? user.roles.includes('Driver') : false;

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
      {user.role === 'Customer' && <CustomerView />}
      {user.role === 'Driver' && <DriverView />}
    </div>
  );
}

export default HomeView;
