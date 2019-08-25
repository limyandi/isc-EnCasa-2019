import React, { useGlobal } from 'reactn';
import axios from 'axios';
import { MyHeader, MySwitch } from '../Components';
import CustomerView from './CustomerView';

function HomeView() {
  // Get user global state data.
  const [user, setUser] = useGlobal('user');

  // by default, set user mode to customer
  const [userMode, setUserMode] = React.useState('Customer');

  const userHasDriverRole = user.roles.includes('Driver');

  const switchUserMode = () => {
    if (userMode === 'Customer') {
      setUserMode('Driver');
    } else {
      setUserMode('Customer');
    }
  };

  return (
    <div>
      <MySwitch
        label={userMode}
        onChange={switchUserMode}
        visible={userHasDriverRole}
      />
      {userMode === 'Customer' && <CustomerView />}
    </div>
  );
}

export default HomeView;
