export default function Pickup(axios, config) {
  const addPickup = pickupObject => {
    // also need to add status
    const { customerId, date, time, timeTo, pickupLocation } = pickupObject;
    console.log(pickupObject);
    if (!customerId || !date || !time || !timeTo || !pickupLocation) {
      throw new Error('invalid pickup object');
    }

    // axios posting.
    return axios.post('logistics/pickup', pickupObject, config);
  };

  const getUnassignedPickups = driverId => {
    return axios.get(`logistics/pickups/${driverId}`, config);
  };

  return {
    addPickup,
    getUnassignedPickups
    // updateDelivery,
    // deleteDelivery,
    // getDelivery,
    // getUnassignedDeliveries
  };
}
