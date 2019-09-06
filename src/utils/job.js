export default function Job(axios, config) {
  const addJob = jobObject => {
    const { deliveryId, driverId, pickupId, ETA } = jobObject;

    if ((!deliveryId && !pickupId) || !driverId || !ETA) {
      throw new Error('invalid job object');
    }
    return axios.post(`/logistics/job`, jobObject, config);
  };

  // user id is used to filter out jobs that this user request (so this user can't see this job as job that he/she can take)
  const getUnassignedJobs = userId => {
    return axios.get(`/logistics/jobs/${userId}`, config);
  };

  return { addJob, getUnassignedJobs };
}
