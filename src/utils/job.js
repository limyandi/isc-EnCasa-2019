export default function Job(axios, config) {
  const addJob = jobObject => {
    const { deliveryId, driverId, pickupId, ETA } = jobObject;

    if ((!deliveryId && !pickupId) || !driverId || !ETA) {
      throw new Error('invalid job object');
    }
    return axios.post(`/logistics/job`, jobObject, config);
  };

  return { addJob };
}
