import React from 'react';
import axios from 'axios';

function HomeView() {
  // TODO: or persist data
  const [userMode, setUserMode] = React.useState('customer');

  const axiosFetch = () =>
    axios.get('/api/users').then(res => console.log(res));

  return (
    <div>
      <button type="button" onClick={axiosFetch}>
        Try Get Value
      </button>
      <div>Your delivery is here!</div>
    </div>
  );
}

export default HomeView;
