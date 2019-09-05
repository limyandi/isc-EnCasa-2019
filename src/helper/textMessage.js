import moment from 'moment';

export const newDeliveryTextBody = (user, date, time, timeTo) =>
  `A new delivery has been posted by a customer, ${
    user.name
  } is available at ${moment(date).format('YYYY-MM')} from ${time}-${timeTo}`;

export const newDeliveryEmailSubject = 'New delivery has been posted';

export const textSMSSenderId = 'CLP';
