import React from 'react';
import axios from 'axios';

function HomeView() {
  const axiosFetch = () =>
    axios.get('/api/users').then(res => console.log(res));

  return (
    <button type="button" onClick={axiosFetch}>
      AH
    </button>
  );
}

export default HomeView;
