import React from 'react';
import axios from 'axios';

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

// TODO: Might not be good idea to use directly here ( use actions? )
import { register } from '../utils/http';

function RegisterView() {
  // hooks for simple email and password form
  const { values, handleChange, handleSubmit } = MyUseForm({
    initialValues: {
      email: '',
      password: '',
      // by default, has the role 1 = Customer
      roles: [1]
    },
    onSubmit(val, errors) {
      // alert(JSON.stringify({ val, errors }, null, 2));
      console.log(val, errors);
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

  function handleClose() {
    setOpen(false);
  }

  function handleConfirm() {
    // TODO: API CALL FOR REGISTER HERE.
    // alert(JSON.stringify({ val, errors }, null, 2));
    setOpen(false);

    register(values);
  }

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
              handleClose={handleClose}
              handleSubmit={handleConfirm}
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

export default RegisterView;
