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
  return axios.get(`/api/delivery/deliveries/${userId}`, config);
}

export function addDelivery(deliveryObject) {
  const { receivingAddress, date, time, pickupLocation } = deliveryObject;

  if (!receivingAddress || !date || !time || !pickupLocation) {
    throw new Error('invalid delivery object');
  }

  // axios posting.
  console.log(receivingAddress, date, time, pickupLocation);
  return axios.post('api/delivery/delivery', config);
}
