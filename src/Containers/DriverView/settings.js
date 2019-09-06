import React, { useGlobal } from 'reactn';
import moment from 'moment';
import {
  MyHeader,
  MyCheckbox,
  MyUseForm,
  MyButton,
  MyTable
} from '../../Components';
import { User } from '../../utils/http';
import { removeDuplicates } from '../../helper/function';
import EditCommunities from '../EditCommunities';
import EditAvailabilities from '../EditAvailablities';

function DriverSetting() {
  const [user, setUser] = useGlobal('user');
  const [selectedCommunities, setSelectedCommunities] = React.useState(
    user.driverDetails.communities
  );

  function handleSelectedCommunities(event) {
    const arr = [...event.target.value];
    setSelectedCommunities(removeDuplicates(arr, event.target.value));
  }

  const { values, handleChange, handleSubmit } = MyUseForm({
    initialValues: {
      emailNotification: user.driverDetails.emailNotification,
      smsNotification: user.driverDetails.smsNotification
    },
    onSubmit(val) {
      const driverDetails = {
        ...user.driverDetails,
        ...val.values,
        communities: selectedCommunities.map(community => community.ID)
      };
      User.updateDriverDetails(driverDetails, user.ID).then(res => {
        setUser({ ...res.data, role: 'Driver' });
      });
    },
    validate() {
      const errors = {};
      return errors;
    }
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <MyHeader>Driver Setting</MyHeader>
        <EditCommunities
          onChange={handleSelectedCommunities}
          value={selectedCommunities}
        />
        <EditAvailabilities
          availabilities={user.driverDetails.availabilities}
        />
        <div>Notification Settings</div>
        <MyCheckbox
          checked={values.emailNotification}
          onChange={handleChange}
          name="emailNotification"
          label="Email Notification"
        />
        <MyCheckbox
          checked={values.smsNotification}
          onChange={handleChange}
          name="smsNotification"
          label="SMS Notification"
        />
        <MyButton
          style={{ marginTop: 15, marginBottom: 10 }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Save
        </MyButton>
      </form>
    </div>
  );
}

export default DriverSetting;
