export default function sendEmail(axios, config) {
  const sendJobNotification = jobNotificationDetails => {
    const { destinations, subject, textBody } = jobNotificationDetails;

    if (!destinations || !textBody || !subject) {
      throw new Error('invalid job notification details data');
    }

    console.log(jobNotificationDetails);

    return axios.post(
      '/notif/email/sendJobNotification',
      jobNotificationDetails,
      config
    );
  };
  return { sendJobNotification };
}
