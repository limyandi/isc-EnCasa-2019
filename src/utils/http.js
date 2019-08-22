import axios from 'axios';

const config = {
  headers: {
    Authorization: 'Basic bHZpY290cmk6ZGlnaXRhbA=='
  }
};

export function register({ email, password, roles }) {
  return axios.post('/api/user/user', { email, password, roles }, config);
}

export function login() {
  return 'haha';
}
