import React, { useEffect, useGlobal } from 'reactn';
import { withRouter } from 'react-router-dom';
import { User } from '../../utils/http';
import { MyHeader, MyTable } from '../../Components';

function DriverView() {
  const [user] = useGlobal('user');

  const [myJobs, setMyJobs] = React.useState([]);

  useEffect(() => {
    User.getMyJobs(user.ID).then(res => {
      // const jobs = [res.data.jobs.map(job => job.deliveries)];
      // check if the jobs exist
      if (res.data.jobs) {
        const jobs = [...res.data.jobs.map(job => job.delivery || job.pickup)];
        setMyJobs(jobs);
      }
    });
  }, [user.ID]);

  return (
    <div>
      <MyHeader>My Job</MyHeader>
      {myJobs.length !== 0 && <MyTable data={myJobs} />}
    </div>
  );
}

export default withRouter(DriverView);
