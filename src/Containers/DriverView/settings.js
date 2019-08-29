import React, { useGlobal } from 'reactn';
import { MyHeader, MyCheckbox, MyUseForm, MyButton } from '../../Components';

function DriverSetting() {
  const [user, setUser] = useGlobal('user');
  const { values, handleChange, handleSubmit } = MyUseForm({
    initialValues: {
      emailNotification: user.driverDetails.emailNotification,
      smsNotification: user.driverDetails.smsNotification
    },
    onSubmit(val, errors) {},
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
        <MyHeader>Driver Settings</MyHeader>
        <div>Availability Settings</div>
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
