import React from 'react';
import axios from 'axios';
import { MyHeader, MySwitch } from '../Components';
import CustomerView from './CustomerView';

function HomeView() {
  // TODO: or persist data
  const [userMode, setUserMode] = React.useState('Customer');

  const switchUserMode = () => {
    return userMode === 'Customer'
      ? setUserMode('Driver')
      : setUserMode('Customer');
  };

  return (
    <div>
      <MySwitch label={userMode} onChange={switchUserMode} />
      {userMode === 'Customer' && CustomerView()}
    </div>
  );
}

export default HomeView;
