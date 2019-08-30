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

  //   const updateDelivery = (deliveryId, deliveryObject) => {
  //     const {
  //       customerId,
  //       fromAddress,
  //       date,
  //       time,
  //       pickupLocation
  //     } = deliveryObject;

  //     if (!customerId || !fromAddress || !date || !time || !pickupLocation) {
  //       throw new Error('invalid delivery object');
  //     }

  //     return axios.put(`logistics/delivery/${deliveryId}`);
  //   };

  //   const deleteDelivery = (deliveryId, deliveryObject) => {
  //     const {
  //       customerId,
  //       fromAddress,
  //       date,
  //       time,
  //       pickupLocation
  //     } = deliveryObject;

  //     if (!customerId || !fromAddress || !date || !time || !pickupLocation) {
  //       throw new Error('invalid delivery object');
  //     }

  //     return axios.delete(`logistics/delivery/${deliveryId}`, config);
  //   };

  //   const getDelivery = deliveryId => {
  //     return axios.get(`logistics/delivery/${deliveryId}`, config);
  //   };

  //   const getUnassignedDeliveries = driverId => {
  //     return axios.get(`logistics/deliveries/${driverId}`, config);
  //   };

  return {
    addPickup
    // updateDelivery,
    // deleteDelivery,
    // getDelivery,
    // getUnassignedDeliveries
  };
}
