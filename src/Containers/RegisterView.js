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
  MyFormDialog
} from '../Components';
import { User, Community } from '../utils/http';

function RegisterView(props) {
  const [communities, setCommunities] = React.useState([]);
  useEffect(() => {
    Community.getCommunities().then(res => {
      setCommunities(res.data);
    });
  }, []);
  const [user, setUser] = useGlobal('user');
  // hooks for simple email and password form
  const { values, handleChange, handleSubmit } = MyUseForm({
    initialValues: {
      email: '',
      password: '',
      driverChecked: false
    },
    onSubmit(val, errors) {
      // alert(JSON.stringify({ val, errors }, null, 2));
      // TODO: Fix this circular dependency.
      // eslint-disable-next-line no-use-before-define
      handleClickOpen();
    },
    validate(val) {
      const errors = {};
      if (val.email === '') {
        errors.name = 'Please enter an email';
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
        driverDetails.availability = 'Always';
        driverDetails.notification = true;
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
        props.history.push('/');
      });
    },
    handleClose: () => {
      setOpen(false);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <MyPaper>
            <MyTextField
              style={{ marginBottom: 10 }}
              name="email"
              label="email"
              value={values.email}
              onChange={handleChange}
            />
            <MyTextField
              style={{ marginBottom: 10 }}
              name="password"
              label="password"
              type="password"
              value={values.password}
              onChange={handleChange}
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
            <MyHyperlink to="/login">
              Already have an account? Login!
            </MyHyperlink>
          </MyPaper>
        </form>
      </div>
    </div>
  );
}

export default withRouter(RegisterView);
