export default function DispatchCentre(axios, config) {
  const getByCommunity = communityId => {
    // axios posting.
    return axios.get(`logistics/dispatchcentres/${communityId}`, config);
  };

  return { getByCommunity };
}
