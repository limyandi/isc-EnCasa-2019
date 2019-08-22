import React from 'react';
import {
  MyTextField,
  MyButton,
  MyHyperlink,
  MyUseForm,
  MyPaper
} from '../Components';

import { login } from '../utils/http';

function LoginView() {
  const { values, handleChange, handleSubmit } = MyUseForm({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit(val, errors) {
      login(val.values);
    },
    validate(val) {
      const errors = {};
      if (val.email === '') {
        errors.name = 'Please enter an email';
      }
      return errors;
    }
  });

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
            <MyButton
              style={{ marginTop: 15, marginBottom: 10 }}
              variant="contained"
              color="primary"
              type="submit"
            >
              Login
            </MyButton>
            <MyHyperlink to="/register">No account? Register!</MyHyperlink>
          </MyPaper>
        </form>
      </div>
    </div>
  );
}

export default LoginView;
