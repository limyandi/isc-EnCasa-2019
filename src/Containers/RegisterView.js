import React, { useGlobal } from 'reactn';
import { withRouter } from 'react-router-dom';

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { User } from '../utils/http';
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

function RegisterView(props) {
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
  const [suburb, setSuburbs] = React.useState([]);

  const suburbLists = [
    'CBD',
    'Mascot',
    'Surry Hills',
    'Hurstville',
    'Glensville'
  ];

  function handleAddSuburb(event) {
    setSuburbs(event.target.value);
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
        driverDetails.Availability = 'Always';
        driverDetails.Notification = true;
      }
      console.log(values);
      User.register({ ...values, driverDetails }).then(res => {
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
                value={suburb}
                onChange={handleAddSuburb}
                valueLists={suburbLists}
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
