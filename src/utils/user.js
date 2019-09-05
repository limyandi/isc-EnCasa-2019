export default function User(axios, config) {
  /** User Driver Utility Here */
  const register = registerObject => {
    const {
      email,
      password,
      phoneNumber,
      driverDetails,
      communities
    } = registerObject;

    if (!email || !password || !phoneNumber || !driverDetails || !communities) {
      throw new Error('Invalid register object');
    }
    return axios.post('logistics/register', registerObject, config);
  };

  const login = loginDetails => {
    const { email, password } = loginDetails;

    if (!email || !password) {
      throw new Error('invalid login details!');
    }
    return axios
      .post('logistics/login', loginDetails, config)
      .then(response => {
        return response;
      })
      .catch(err => {
        return err.response;
      });
  };

  /** Customer(User) Utility Here */
  const updateCustomerDetails = (customerDetails, userId) => {
    console.log(customerDetails);
    // console.log({ customerDetails });
    return axios.put(`/logistics/user/${userId}`, customerDetails, config);
  };

  /** Driver Utility Here */
  const getMyJobs = driverId => {
    return axios.get(`logistics/driver/${driverId}/jobs`, config);
  };

  const getDriversByAvailability = availabilityDetails => {
    const { day, timeFrom, timeTo } = availabilityDetails;

    if (!day || !timeFrom || !timeTo)
      throw new Error('invalid availability details');
    return axios.get('logistics/driver/findByAvailability', {
      params: availabilityDetails,
      headers: config.headers
    });
  };

  const updateDriverDetails = (driverDetails, userId) => {
    return axios.put(
      `/logistics/user/driverDetails/${userId}`,
      { driverDetails },
      config
    );
  };

  const getDriversSubscriptedEmail = (communityId, requesterId) => {
    return axios.get(`logistics/driver/subscriptEmail`, {
      params: { communityId, requesterId },
      headers: config.headers
    });
  };

  const getDriversSubscriptedSMS = (communityId, requesterId) => {
    return axios.get(`logistics/driver/subscriptSMS`, {
      params: { communityId, requesterId },
      headers: config.headers
    });
  };

  return {
    register,
    login,
    updateCustomerDetails,
    getMyJobs,
    getDriversByAvailability,
    updateDriverDetails,
    getDriversSubscriptedEmail,
    getDriversSubscriptedSMS
  };
}
