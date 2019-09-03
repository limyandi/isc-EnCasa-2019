import React, { useGlobal } from 'reactn';
import moment from 'moment';
import {
  MyHeader,
  MyCheckbox,
  MyUseForm,
  MyButton,
  MyTable,
  MyDropdown
} from '../../Components';
import { User, Community } from '../../utils/http';

function CustomerSetting() {
  const [user, setUser] = useGlobal('user');
  const [communities, setCommunities] = React.useState(undefined);
  const [selectedCommunities, setSelectedCommunities] = React.useState(
    user.communities
  );

  React.useEffect(() => {
    Community.getCommunities().then(res => {
      setCommunities(res.data);
    });
  }, [setCommunities]);

  const { values, handleChange, handleSubmit } = MyUseForm({
    initialValues: {
      emailNotification: user.emailNotification,
      smsNotification: user.smsNotification
    },
    onSubmit(val, errors) {
      const customerDetails = val.values;
      const myCommunities = selectedCommunities.map(
        selectedCommunity => selectedCommunity.ID
      );

      User.updateCustomerDetails(customerDetails, user.ID).then(res =>
        setUser({
          ...res.data,
          ...{ communities: myCommunities },
          role: 'Customer'
        })
      );
    },
    validate(val) {
      const errors = {};
      return errors;
    }
  });

  function handleSelectedCommunities(event) {
    setSelectedCommunities(event.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <MyHeader>Customer Setting</MyHeader>
        <div>Edit Communities</div>
        {communities && (
          <MyDropdown
            value={selectedCommunities}
            onChange={handleSelectedCommunities}
            valueLists={communities.communities}
          />
        )}
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

export default CustomerSetting;
