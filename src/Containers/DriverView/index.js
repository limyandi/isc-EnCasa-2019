import React, { useEffect, useGlobal } from 'reactn';
import { withRouter } from 'react-router-dom';
import { Delivery, Job, User, Pickup } from '../../utils/http';
import { MyHeader, MyTable } from '../../Components';
import MyHyperLink from '../../Components/Hyperlink';

function DriverView() {
  const [user] = useGlobal('user');

  const [myJobs, setMyJobs] = React.useState([]);
  const [unassignedDeliveries, setUnassignedDeliveries] = React.useState([]);
  const [unassignedPickups, setUnassignedPickups] = React.useState([]);
  useEffect(() => {
    Delivery.getUnassignedDeliveries(user.ID).then(res => {
      setUnassignedDeliveries(res.data.deliveries);
    });
    Pickup.getUnassignedPickups(user.ID).then(res => {
      setUnassignedPickups(res.data.pickups);
    });
    User.getMyJobs(user.ID).then(res => {
      // const jobs = [res.data.jobs.map(job => job.deliveries)];
      // check if the jobs exist
      if (res.data.jobs) {
        const jobs = [...res.data.jobs.map(job => job.delivery)];
        setMyJobs(jobs);
      }
    });
  }, [user.ID]);

  const handleAddDeliveriesOnClick = data => {
    Job.addJob({ deliveryId: data.ID, driverId: user.ID }).then(res => {
      // TODO: Remove delivery from unassigned delivery
      setUnassignedDeliveries(
        unassignedDeliveries.filter(i => i.ID !== data.ID)
      );
      const addedJobs = [...myJobs, res.data.delivery];
      setMyJobs(addedJobs);
    });
  };

  const handleAddPickupsOnClick = data => {
    Job.addJob({ pickupId: data.ID, driverId: user.ID }).then(res => {
      // TODO: Remove delivery from unassigned delivery
      setUnassignedPickups(unassignedPickups.filter(i => i.ID !== data.ID));
      const addedJobs = [...myJobs, res.data.pickup];
      setMyJobs(addedJobs);
    });
  };

  return (
    <div>
      <MyHeader>My Job</MyHeader>
      {myJobs.length !== 0 && <MyTable data={myJobs} />}
      <MyHeader>Unassigned Job</MyHeader>
      <div>Deliveries</div>
      {unassignedDeliveries.length !== 0 && (
        <MyTable
          addOnClick={handleAddDeliveriesOnClick}
          addable
          data={unassignedDeliveries}
        />
      )}
      <div>Pickups</div>
      {unassignedPickups.length !== 0 && (
        <MyTable
          addOnClick={handleAddPickupsOnClick}
          addable
          data={unassignedPickups}
        />
      )}
    </div>
  );
}

export default withRouter(DriverView);
