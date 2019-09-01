export default function sendEmail(axios, config) {
  const sendNewJobNotification = ({ jobNotificationDetails }) => {
    const { destinations, textBody } = jobNotificationDetails;

    if (!destinations || !textBody) {
      throw new Error('invalid job notification details data');
    }

    return axios.post('', jobNotificationDetails, config);
  };
  return { sendNewJobNotification };
}
