import React, { useGlobal, useEffect } from 'reactn';
import { withRouter } from 'react-router-dom';
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

function RegisterView(props) {
  const [communities, setCommunities] = React.useState([]);
  const [, setIsAuthenticated] = useGlobal('isAuthenticated');
  useEffect(() => {
    Community.getCommunities().then(res => {
      setCommunities(res.data);
    });
  }, []);
  const [, setUser] = useGlobal('user');
  // hooks for simple email and password form
  const { values, errors, handleChange, handleSubmit } = MyUseForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      phoneNumber: '0427399979',
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
        // TODO: Basic Driver Details
        driverDetails.availabilities = {
          Monday: {
            from: '08:30:00Z',
            to: '20:00:00Z'
          },
          Tuesday: {
            from: '08:30:00Z',
            to: '20:00:00Z'
          },
          Wednesday: {
            from: '08:30:00Z',
            to: '20:00:00Z'
          },
          Thursday: {
            from: '08:30:00Z',
            to: '20:00:00Z'
          },
          Friday: {
            from: '08:30:00Z',
            to: '20:00:00Z'
          },
          Saturday: {
            from: '08:30:00Z',
            to: '20:00:00Z'
          },
          Sunday: {
            from: '08:30:00Z',
            to: '20:00:00Z'
          }
        };
        driverDetails.appNotification = true;
        driverDetails.smsNotification = false;
        driverDetails.emailNotification = false;
      }
      const myCommunities = selectedCommunities.map(
        selectedCommunity => selectedCommunity.id
      );

      User.register({
        ...values,
        driverDetails,
        ...{ communities: myCommunities }
      }).then(res => {
        // default role is customer
        setUser({ ...res.data, role: 'Customer' });
        setIsAuthenticated(true);
        props.history.push('/');
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
          <MyPhoneNumberTextField
            required
            name="phoneNumber"
            label="Phone Number"
            onChange={handleChange}
            value={values.phoneNumber}
          />
          <MyCheckbox
            checked={values.driverChecked}
            onChange={handleChange}
            name="driverChecked"
            label="Register as Driver"
          />
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
