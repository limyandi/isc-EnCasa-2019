import React from 'react';
import MyTextField from '../Components/TextField';
import MyButton from '../Components/Button';
import useForm from '../Components/UseForm';
import MyHyperLink from '../Components/Hyperlink';

function RegisterView() {
  const { values, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit(val, errors) {
      alert(JSON.stringify({ val, errors }, null, 2));
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
            value={values.password}
            onChange={handleChange}
          />
          <MyButton style={{ marginTop: 15 }} variant="contained" color="primary" type="submit">
            Register
          </MyButton>
          <MyHyperLink to="/">Already have an account? Login!</MyHyperLink>
        </form>
      </div>
    </div>
  );
}

export default RegisterView;
