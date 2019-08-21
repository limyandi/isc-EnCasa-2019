import React from 'react';
import axios from 'axios';
import { MyHeader } from '../Components';
import CustomerView from './CustomerView';

function HomeView() {
  // TODO: or persist data
  const [userMode, setUserMode] = React.useState('customer');
  console.log(userMode);

  const axiosFetch = () =>
    axios.get('/api/users').then(res => console.log(res));

  return (
    <div>
      <button type="button" onClick={axiosFetch}>
        Try Get Value
      </button>
      {userMode === 'customer' && CustomerView()}
    </div>
  );
}

export default HomeView;
