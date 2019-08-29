export default function Job(axios, config) {
  const addJob = jobObject => {
    const { deliveryId, driverId } = jobObject;

    if (!deliveryId || !driverId) {
      throw new Error('invalid job object');
    }
    return axios.post(`logistics/job`, jobObject, config);
  };

  return { addJob };
}
