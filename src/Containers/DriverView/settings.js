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

function DriverSetting() {
  const [user, setUser] = useGlobal('user');

  const availabilitiesTableHeader = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  const availabilitiesTableBody = Object.keys(
    user.driverDetails.availabilities
  ).map(day => {
    const timeFrom = moment(
      `"${user.driverDetails.availabilities[day].from}"`,
      'HH:mm'
    ).format('HH:mm');
    const timeTo = moment(
      `"${user.driverDetails.availabilities[day].to}"`,
      'HH:mm'
    ).format('HH:mm');
    return {
      [day]: `${timeFrom}-${timeTo}`
    };
  });

  const { values, handleChange, handleSubmit } = MyUseForm({
    initialValues: {
      emailNotification: user.driverDetails.emailNotification,
      smsNotification: user.driverDetails.smsNotification
    },
    onSubmit(val, errors) {
      const driverDetails = { ...user.driverDetails, ...val.values };
      User.updateDriverDetails(driverDetails, user.ID).then(res =>
        setUser({ ...res.data, role: 'Driver' })
      );
    },
    validate(val) {
      const errors = {};
      return errors;
    }
  });

  // TODO: Availability Settings - Time Range
  // TODO: Notification settings - with checkbox
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <MyHeader>Driver Setting</MyHeader>
        <div>Availability Settings</div>
        <MyTable
          tableHeader={availabilitiesTableHeader}
          tableBody={availabilitiesTableBody}
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
