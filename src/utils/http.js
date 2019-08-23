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
