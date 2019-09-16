import moment from 'moment';

/** Email Helper */
export const newDeliveryEmailSubject = 'New delivery has been posted';
export const newPickupEmailSubject = 'New pickup has been posted';

/** SMS Text Helper */
export const textSMSSenderId = 'CLP';

/** Both */

// Requested by user scenario, send to user
export const newPickupTextBody = (user, date, time, timeTo) =>
  `A new pickup request has been posted by a customer, ${
    user.name
  } is available at ${moment(date).format('DD/MM')} from ${time}-${timeTo}`;

export const newDeliveryTextBody = (user, date, time, timeTo) =>
  `A new delivery has been posted by a customer, ${
    user.name
  } is available at ${moment(date).format('DD/MM')} from ${time}-${timeTo}`;

// Accepted by driver scenario, send to user
export const acceptedRequestTextBody = (jobData, user, ETA) =>
  `Your ${jobData.type} request ${jobData.ID} has been accepted by ${user.name}. Estimated arrival time is on ${ETA}`;
