export default function User(axios, config) {
  const register = ({ email, password, roles }) => {
    return axios
      .post('/logistics/register', { email, password, roles }, config)
      .then(res => console.log(res));
  };

  const login = ({ email, password }) => {
    return axios.post('/logistics/login', { email, password }, config);
  };

  //   const getMyDeliveries = userId => {
  //     return axios.get(`/api/user/user/${userId}`, config);
  //   };

  const addDelivery = deliveryObject => {
    console.log(deliveryObject);
    const {
      customerid,
      fromaddress,
      date,
      time,
      pickuplocation
    } = deliveryObject;
    console.log(customerid, fromaddress, date, time, pickuplocation);
    if (!customerid || !fromaddress || !date || !time || !pickuplocation) {
      throw new Error('invalid delivery object');
    }

    // axios posting.
    return axios.post('api/delivery/delivery', deliveryObject, config);
  };

  return { register, login, getMyDeliveries, addDelivery };
}
