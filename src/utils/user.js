export default function User(axios, config) {
  const register = registerObject => {
    const { email, password, driverDetails } = registerObject;

    if (!email || !password || !driverDetails) {
      throw new Error('Invalid register object');
    }
    return axios.post('logistics/register', registerObject, config);
  };

  const login = loginDetails => {
    const { email, password } = loginDetails;

    console.log(loginDetails);
    if (!email || !password) {
      throw new Error('invalid login details!');
    }
    return axios.post('logistics/login', loginDetails, config);
  };

  //   const getMyDeliveries = userId => {
  //     return axios.get(`/api/user/user/${userId}`, config);
  //   };

  const addDelivery = deliveryObject => {
    // also need to add status
    const {
      customerId,
      fromAddress,
      date,
      time,
      pickupLocation
    } = deliveryObject;
    console.log(customerId, fromAddress, date, time, pickupLocation);
    if (!customerId || !fromAddress || !date || !time || !pickupLocation) {
      throw new Error('invalid delivery object');
    }

    // axios posting.
    return axios.post('logistics/delivery', deliveryObject, config);
  };

  return { register, login, addDelivery };
}
