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

  return {
    addPickup,
    getUnassignedPickups
  };
}
