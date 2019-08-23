import React, { useEffect } from 'react';
import { MyHeader } from '../Components';
import { getMyDeliveries } from '../utils/http';

function CustomerView() {
  useEffect(() => {
    getMyDeliveries(1).then(res => console.log(res));
  }, []);

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
