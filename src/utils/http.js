import axios from 'axios';

const config = {
  headers: {
    Authorization: 'Basic bHZpY290cmk6ZGlnaXRhbA=='
  }
};

export function register({ email, password, roles }) {
  return axios
    .post('/api/user/user', { email, password, roles }, config)
    .then(res => console.log(res));
}

export function login({ email, password }) {
  return axios.post('/api/user/userlogin', { email, password }, config);
}

export function getMyDeliveries(userId) {
  return axios.get(`/api/user/user/${userId}`, config);
}

export function addDelivery(deliveryObject) {
  const {
    customerid,
    fromaddress,
    date,
    time,
    pickuplocation
  } = deliveryObject;
  console.log(customerid, fromaddress, date, time, pickuplocation);
  if (!customerid || !fromaddress || !date || !time || !pickuplocation) {
    throw new Error('invalid delivery object');
  }

  // axios posting.

  return axios.post('api/delivery/delivery', deliveryObject, config);
}
