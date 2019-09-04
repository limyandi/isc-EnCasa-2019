export default function Delivery(axios, config) {
  const addDelivery = deliveryObject => {
    // also need to add status
    const {
      customerId,
      deliveryAddress,
      date,
      time,
      timeTo,
      pickupAddress
    } = deliveryObject;
    if (
      !customerId ||
      !deliveryAddress ||
      !date ||
      !time ||
      !timeTo ||
      !pickupAddress
    ) {
      throw new Error('invalid delivery object');
    }

    // axios posting.
    return axios.post('/logistics/delivery', deliveryObject, config);
  };

  const updateDelivery = (deliveryId, deliveryObject) => {
    const {
      customerId,
      deliveryAddress,
      date,
      time,
      pickupAddress
    } = deliveryObject;

    if (!customerId || !deliveryAddress || !date || !time || !pickupAddress) {
      throw new Error('invalid delivery object');
    }

    return axios.put(`logistics/delivery/${deliveryId}`);
  };

  const deleteDelivery = (deliveryId, deliveryObject) => {
    const {
      customerId,
      deliveryAddress,
      date,
      time,
      pickupAddress
    } = deliveryObject;

    if (!customerId || !deliveryAddress || !date || !time || !pickupAddress) {
      throw new Error('invalid delivery object');
    }

    return axios.delete(`logistics/delivery/${deliveryId}`, config);
  };

  const getDelivery = deliveryId => {
    return axios.get(`logistics/delivery/${deliveryId}`, config);
  };

  const getUnassignedDeliveries = driverId => {
    return axios.get(`/logistics/deliveries/${driverId}`, config);
  };

  return {
    addDelivery,
    updateDelivery,
    deleteDelivery,
    getDelivery,
    getUnassignedDeliveries
  };
}
