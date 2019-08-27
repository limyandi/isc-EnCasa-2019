import React, { useGlobal } from 'reactn';
import { withRouter } from 'react-router-dom';
import {
  MyTextField,
  MyButton,
  MyHyperlink,
  MyUseForm,
  MyPaper
} from '../Components';
import { User } from '../utils/http';

// import { login } from '../utils/http';

function LoginView() {
  const [user, setUser] = useGlobal('user');
  const { values, handleChange, handleSubmit } = MyUseForm({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit(val, errors) {
      User.login(val.values).then(res => {
        setUser({
          ...res.data,
          // default role is customer
          role: 'Customer'
        });
        this.props.history.push('/home');
      });
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

export default withRouter(LoginView);
