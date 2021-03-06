import React, { useGlobal } from 'reactn';
import ReactPhoneInput from 'react-phone-input-2';
import { MyHeader, MyCheckbox, MyUseForm, MyButton } from '../../Components';
import { User } from '../../utils/http';
import { removeDuplicates } from '../../helper/function';
import EditCommunities from '../EditCommunities';
import 'react-phone-input-2/dist/style.css';

function CustomerSetting() {
  const [user, setUser] = useGlobal('user');
  const [selectedCommunities, setSelectedCommunities] = React.useState(
    user.communities
  );
  const [phoneNumber, setPhoneNumber] = React.useState(user.phoneNumber);

  function handleSelectedCommunities(event) {
    const arr = [...event.target.value];
    setSelectedCommunities(removeDuplicates(arr, event.target.value));
  }

  const { values, handleChange, handleSubmit } = MyUseForm({
    initialValues: {
      emailNotification: user.emailNotification,
      smsNotification: user.smsNotification
    },
    onSubmit(val) {
      const customerDetails = {
        ...val.values,
        phoneNumber,
        communities: selectedCommunities.map(community => community.ID)
      };

      User.updateCustomerDetails(customerDetails, user.ID).then(res => {
        setUser({
          ...res.data,
          role: 'Customer'
        });
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
        <MyHeader>Customer Setting</MyHeader>
        <EditCommunities
          onChange={handleSelectedCommunities}
          value={selectedCommunities}
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
        <ReactPhoneInput
          defaultCountry="au"
          onlyCountries={['au']}
          value={phoneNumber}
          onChange={val => setPhoneNumber(val)}
          label="Phone Number"
          name="phoneNumber"
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
