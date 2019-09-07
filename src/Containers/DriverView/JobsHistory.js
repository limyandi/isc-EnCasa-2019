import React, { useEffect, useGlobal } from 'reactn';
import { withRouter } from 'react-router-dom';
import { User } from '../../utils/http';
import { MyHeader, MyTable } from '../../Components';

function JobsHistory() {
  return (
    <div>
      <MyHeader>Past Jobs</MyHeader>
    </div>
  );
}

export default withRouter(JobsHistory);
