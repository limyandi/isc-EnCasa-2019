import axios from 'axios';
import MyUser from './user';
import MyDelivery from './delivery';
import MyCommunity from './community';
import MyJob from './job';
import MyPickup from './pickup';
import MySendEmail from './sendEmail';

const config = {
  headers: {
    Authorization: 'Basic bHZpY290cmk6ZGlnaXRhbA=='
  }
};

const User = MyUser(axios, config);
const Delivery = MyDelivery(axios, config);
const Community = MyCommunity(axios, config);
const Job = MyJob(axios, config);
const Pickup = MyPickup(axios, config);
const sendEmail = MySendEmail(axios, config);
export { User, Delivery, Community, Job, Pickup, sendEmail };
