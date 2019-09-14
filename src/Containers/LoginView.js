import React, { useGlobal } from 'reactn';
import { withRouter } from 'react-router-dom';
import {
  MyTextField,
  MyButton,
  MyHyperlink,
  MyUseForm,
  MyPaper,
  MyHeader,
  MyErrorText
} from '../Components';
import { User } from '../utils/http';
import './helper.css';

// import { login } from '../utils/http';

function LoginView(props) {
  const [user, setUser] = useGlobal('user');
  const [, setIsAuthenticated] = useGlobal('isAuthenticated');
  const [loginError, setLoginError] = React.useState('');
  const { values, errors, handleChange, handleSubmit } = MyUseForm({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit(val) {
      User.login(val.values).then(res => {
        // TODO: Move all this logic to reducers
        if (res.status !== 200) {
          setLoginError(res.data.message);
          return;
        }
        setUser({
          ...res.data,
          // initial default role is customer
          role: 'Customer'
        });
        setIsAuthenticated(true);
        props.history.push('/');
      });
    },
    validate(val) {
      if (val.email === '') {
        errors.name = 'Please enter an email';
      }
      return errors;
    }
  });

  return (
    <div className="absoluteCenter">
      <form onSubmit={handleSubmit}>
        <MyPaper>
          <MyHeader>Login</MyHeader>
          <MyTextField
            style={{ marginBottom: 10 }}
            name="email"
            label="Email"
            value={values.email}
            onChange={handleChange}
          />
          <MyTextField
            style={{ marginBottom: 10 }}
            name="password"
            label="Password"
            type="password"
            value={values.password}
            onChange={handleChange}
          />
          {loginError && <MyErrorText>{loginError}</MyErrorText>}
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
  );
}

export default withRouter(LoginView);
