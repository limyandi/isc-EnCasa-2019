import axios from 'axios';
import MyUser from './user';
import MyDelivery from './delivery';
import MyCommunity from './community';
import MyJob from './job';

const config = {
  headers: {
    Authorization: 'Basic bHZpY290cmk6ZGlnaXRhbA=='
  }
};

const User = MyUser(axios, config);
const Delivery = MyDelivery(axios, config);
const Community = MyCommunity(axios, config);
const Job = MyJob(axios, config);
export { User, Delivery, Community, Job };
