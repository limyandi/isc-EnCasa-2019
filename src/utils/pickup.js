export default function Pickup(axios, config) {
  const addPickup = pickupObject => {
    // also need to add status
    const { customerId, date, time, timeTo, pickupAddress } = pickupObject;
    if (!customerId || !date || !time || !timeTo || !pickupAddress) {
      throw new Error('invalid pickup object');
    }

    // axios posting.
    return axios.post('/logistics/pickup', pickupObject, config);
  };

  const getUnassignedPickups = driverId => {
    return axios.get(`/logistics/pickups/${driverId}`, config);
  };

  const getCurrentPickupsRequest = (userId, status = 0) => {
    return axios.get(`/logistics/pickups/${userId}`, {
      params: { status, past: 0 },
      headers: config.headers
    });
  };

  const getPastPickupsRequest = userId => {
    return axios.get(`/logistics/pickups/${userId}`, {
      params: {
        past: 1
      },
      headers: config.headers
    });
  };

  return {
    addPickup,
    getUnassignedPickups,
    getCurrentPickupsRequest,
    getPastPickupsRequest
  };
}
