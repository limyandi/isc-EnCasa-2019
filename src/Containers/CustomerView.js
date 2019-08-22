import React from 'react';
import { MyHeader } from '../Components';
import { getMyDeliveries } from '../utils/http';

function CustomerView() {
  const fetchDeliveries = () => {
    // Todo -> Get user id.
    getMyDeliveries(2).then(res => console.log(res));
  };

  return (
    <div>
      <MyHeader>Your delivery - Customer View</MyHeader>
      <div />
    </div>
  );
}

export default CustomerView;
