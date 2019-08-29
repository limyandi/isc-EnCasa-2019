import React, { useEffect, useGlobal } from 'reactn';
import { Delivery, Job, User } from '../../utils/http';
import { MyHeader, MyTable } from '../../Components';
import MyHyperLink from '../../Components/Hyperlink';

function DriverView(props) {
  const [user, setUser] = useGlobal('user');

  const [myJobs, setMyJobs] = React.useState([]);
  const [unassignedDeliveries, setUnassignedDeliveries] = React.useState([]);
  useEffect(() => {
    Delivery.getUnassignedDeliveries(user.ID).then(res => {
      console.log(res.data);
      setUnassignedDeliveries(res.data.deliveries);
    });
    User.getMyJobs(user.ID).then(res => {
      // const jobs = [res.data.jobs.map(job => job.deliveries)];
      // check if the jobs exist
      if (res.data.jobs) {
        const jobs = [...res.data.jobs.map(job => job.delivery)];
        console.log(jobs);
        setMyJobs(jobs);
      }
    });
  }, []);

  const handleAddOnClick = data => {
    Job.addJob({ deliveryId: data.ID, driverId: user.ID }).then(res => {
      // TODO: Remove delivery from unassigned delivery
      setUnassignedDeliveries(
        unassignedDeliveries.filter(i => i.ID !== data.ID)
      );
      const addedJobs = [...myJobs, res.data.delivery];
      setMyJobs(addedJobs);
    });
  };

  return (
    <div>
      <div>Driver view!</div>
      <MyHeader>My Job</MyHeader>
      {myJobs.length !== 0 && <MyTable data={myJobs} />}
      <MyHeader>Unassigned Job</MyHeader>
      {unassignedDeliveries.length !== 0 && (
        <MyTable
          addOnClick={handleAddOnClick}
          addable
          data={unassignedDeliveries}
        />
      )}
      {/* <MyHyperLink to={`${props.match.url}/settings`}>
        Already have an account? Login!
      </MyHyperLink> */}
    </div>
  );
}

export default DriverView;
