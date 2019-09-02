export default function User(axios, config) {
  const register = registerObject => {
    const {
      email,
      password,
      phoneNumber,
      driverDetails,
      communities
    } = registerObject;

    console.log(registerObject);
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
    return axios.post('logistics/login', loginDetails, config);
  };

  // get jobs only available for driver
  const getMyJobs = driverId => {
    return axios.get(`logistics/driver/${driverId}/jobs`, config);
  };

  const getDriversByAvailability = availabilityDetails => {
    const { day, timeFrom, timeTo } = availabilityDetails;

    if (!day || !timeFrom || !timeTo)
      throw new Error('invalid availability details');
    console.log(config.headers);
    return axios.get('logistics/driver/findByAvailability', {
      params: availabilityDetails,
      headers: config.headers
    });
  };

  const getDriversSubscriptedEmail = () => {
    return axios.get('logistics/driver/subscriptEmail', config);
  };

  return {
    register,
    login,
    getMyJobs,
    getDriversByAvailability,
    getDriversSubscriptedEmail
  };
}
