import axios from 'axios';
import MyUser from './user';
import MyDelivery from './delivery';
import MyCommunity from './community';
import MyJob from './job';
import MyPickup from './pickup';
import MySendEmail from './sendEmail';
import MyDispatchCentre from './dispatchCentre';

const config = {
  headers: {
    Authorization: 'Basic bHZpY290cmk6ZGlnaXRhbA=='
  }
};

const User = MyUser(axios, config);
const DispatchCentre = MyDispatchCentre(axios, config);
const Delivery = MyDelivery(axios, config);
const Community = MyCommunity(axios, config);
const Job = MyJob(axios, config);
const Pickup = MyPickup(axios, config);
const sendEmail = MySendEmail(axios, config);

export { User, DispatchCentre, Delivery, Community, Job, Pickup, sendEmail };
