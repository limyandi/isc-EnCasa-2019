export default function User(axios, config) {
  const register = registerObject => {
    const { email, password, driverDetails, communities } = registerObject;

    if (!email || !password || !driverDetails || !communities) {
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

  // get jobs only available for driver
  const getMyJobs = driverId => {
    return axios.get(`logistics/driver/${driverId}/jobs`, config);
  };

  return { register, login, getMyJobs };
}
