import React, { useGlobal, useEffect } from 'reactn';
import { withRouter } from 'react-router-dom';
import MuiPhoneNumber from 'material-ui-phone-number';
import {
  MyTextField,
  MyButton,
  MyHyperlink,
  MyUseForm,
  MyPaper,
  MyDropdown,
  MyCheckbox,
  MyFormDialog,
  MyHeader,
  MyPhoneNumberTextField
} from '../Components';
import { User, Community } from '../utils/http';
import MyErrorText from '../Components/ErrorText';
import { basicDriverDetails } from '../helper/function';

function RegisterView(props) {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [, setIsAuthenticated] = useGlobal('isAuthenticated');
  const [, setUser] = useGlobal('user');
  const [communities, setCommunities] = React.useState([]);

  useEffect(() => {
    Community.getCommunities().then(res => {
      setCommunities(res.data);
    });
  }, [setCommunities]);

  // hooks for simple email and password form
  const { values, errors, handleChange, handleSubmit } = MyUseForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      driverChecked: false
    },
    onSubmit(val, errors) {
      // if there is no error.
      // eslint-disable-next-line no-use-before-define
      if (Object.keys(val.e).length === 0) handleClickOpen();
    },
    validate(val) {
      const errors = {};
      if (!val.email) {
        errors.email = 'Please enter an email';
      } else if (!/\S+@\S+\.\S+/.test(val.email)) {
        errors.email = 'Email address is invalid';
      }

      if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(val.name)) {
        errors.name = 'Name is in invalid format';
      }

      if (
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(val.password)
      ) {
        errors.password =
          'Password must at least contain one digit, one lower case, one upper case and 8 words long';
      }

      return errors;
    }
  });

  const [open, setOpen] = React.useState(false);
  const [selectedCommunities, setSelectedCommunities] = React.useState([]);
  const [emailExistsError, setEmailExistsError] = React.useState('');

  function handleSelectedCommunities(event) {
    setSelectedCommunities(event.target.value);
  }

  function handleClickOpen() {
    setOpen(true);
  }

  const communityForm = {
    dialogTitle: 'Community',
    dialogText: 'Continue by selecting your community',
    handleConfirm: () => {
      setOpen(false);
      const driverDetails = {};

      if (values.driverChecked) {
        driverDetails.availabilities = basicDriverDetails;
        driverDetails.appNotification = true;
        driverDetails.smsNotification = false;
        driverDetails.emailNotification = false;
      }

      const myCommunities = selectedCommunities.map(
        selectedCommunity => selectedCommunity.ID
      );

      // this is for user, the previous one is for driver
      const userNotificationDetails = {
        appNotification: true,
        emailNotification: false,
        smsNotification: false
      };
      User.register({
        ...values,
        phoneNumber,
        ...{ ...userNotificationDetails },
        driverDetails,
        ...{ communities: myCommunities }
      })
        .then(res => {
          // default role is customer
          setUser({ ...res.data, role: 'Customer' });
          setIsAuthenticated(true);
          props.history.push('/');
        })
        .catch(err => {
          setEmailExistsError(
            'The email you used is already existing, try to use another email'
          );
          setOpen(false);
          return err;
        });
    },
    handleClose: () => {
      setOpen(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <MyPaper>
          <MyHeader>Register</MyHeader>
          <MyTextField
            required
            style={{ marginBottom: 10 }}
            name="email"
            label="Email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <MyErrorText>{errors.email}</MyErrorText>}
          <MyTextField
            required
            style={{ marginBottom: 10 }}
            name="name"
            label="Name"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <MyErrorText>{errors.name}</MyErrorText>}
          <MyTextField
            required
            style={{ marginBottom: 10 }}
            name="password"
            label="Password"
            type="Password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <MyErrorText>{errors.password}</MyErrorText>}
          <MuiPhoneNumber
            required
            defaultCountry="au"
            onlyCountries={['au']}
            onChange={val => setPhoneNumber(val)}
            value={phoneNumber}
            label="Phone Number"
            name="phoneNumber"
          />
          <MyCheckbox
            checked={values.driverChecked}
            onChange={handleChange}
            name="driverChecked"
            label="Register as Driver"
          />
          {emailExistsError && <MyErrorText>{emailExistsError}</MyErrorText>}
          <MyButton
            style={{ marginTop: 15, marginBottom: 10 }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Register
          </MyButton>
          <MyFormDialog
            open={open}
            handleClose={communityForm.handleClose}
            handleSubmit={communityForm.handleConfirm}
            dialogTitle={communityForm.dialogTitle}
            dialogText={communityForm.dialogText}
          >
            <MyDropdown
              value={selectedCommunities}
              onChange={handleSelectedCommunities}
              valueLists={communities.communities}
            />
          </MyFormDialog>
          <MyHyperlink to="/login">Already have an account? Login!</MyHyperlink>
        </MyPaper>
      </form>
    </div>
  );
}

export default withRouter(RegisterView);
