export default function Job(axios, config) {
  const addJob = jobObject => {
    const { deliveryId, driverId, pickupId } = jobObject;

    if ((!deliveryId && !pickupId) || !driverId) {
      throw new Error('invalid job object');
    }
    return axios.post(`/logistics/job`, jobObject, config);
  };

  return { addJob };
}
