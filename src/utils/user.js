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

  return { register, login };
}
