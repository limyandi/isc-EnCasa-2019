import React, { useEffect, useGlobal } from 'reactn';
import { withRouter } from 'react-router-dom';
import { User } from '../../utils/http';
import { MyHeader, MyTable } from '../../Components';

function JobsHistory() {
  const [user] = useGlobal('user');
  const [myCompletedDeliveryJobs, setMyCompletedDeliveryJobs] = React.useState(
    []
  );
  const [myCompletedPickupJobs, setMyCompletedPickupJobs] = React.useState([]);

  useEffect(() => {
    User.getMyCompletedJobs(user.ID).then(res => {
      // const jobs = [res.data.jobs.map(job => job.deliveries)];
      // check if the jobs exist
      if (res.data) {
        const deliveryJobs = [...res.data.deliveries.map(delivery => delivery)];
        setMyCompletedDeliveryJobs(deliveryJobs);
        const pickupJobs = [...res.data.pickups.map(pickup => pickup)];
        setMyCompletedPickupJobs(pickupJobs);
      }
    });
  }, [user.ID]);

  const MyCompletedDeliveryJobs = () => {
    if (myCompletedDeliveryJobs && myCompletedDeliveryJobs.length !== 0) {
      return (
        <div>
          <div>Delivery</div>
          <MyTable data={myCompletedDeliveryJobs} />
        </div>
      );
    }
    return null;
  };

  const MyCompletedPickupJobs = () => {
    if (myCompletedPickupJobs && myCompletedPickupJobs.length !== 0) {
      return (
        <div>
          <div>Pickup</div>
          <MyTable data={myCompletedPickupJobs} />
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <MyHeader>Past Jobs</MyHeader>
      <MyCompletedDeliveryJobs />
      <MyCompletedPickupJobs />
    </div>
  );
}

export default withRouter(JobsHistory);
