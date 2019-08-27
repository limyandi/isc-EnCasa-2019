import axios from 'axios';
import MyUser from './user';

const config = {
  headers: {
    Authorization: 'Basic bHZpY290cmk6ZGlnaXRhbA=='
  }
};

const User = MyUser(axios, config);
console.log(User);
export { User };
