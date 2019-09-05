export default function sendSMS(axios, config) {
  const sendJobNotification = jobNotificationDetails => {
    const { to, senderId, messageText } = jobNotificationDetails;

    if (!to || !senderId || !messageText) {
      throw new Error('invalid job notification details data');
    }

    console.log(jobNotificationDetails);

    return axios.post(
      '/notif/sms/sendJobNotification',
      jobNotificationDetails,
      config
    );
  };
  return { sendJobNotification };
}
