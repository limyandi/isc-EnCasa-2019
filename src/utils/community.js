export default function Community(axios, config) {
  const getCommunities = () => {
    // axios posting.
    return axios.get('/logistics/communities', config);
  };

  return { getCommunities };
}
