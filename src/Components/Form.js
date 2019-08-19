import React from 'react';
import PropTypes from 'prop-types';
import MyButton from './Button';
import MyTextField from './TextField';

const MyForm = props => {
  let handleUsername = () => {};

  const formStyle = {
    display: 'inline-block',
    margin: 'auto',
    textAlign: 'center'
  };

  return (
    <form style={formStyle}>
      <MyTextField style={{ marginBottom: 10 }} label="Username" />
      <MyTextField style={{ marginBottom: 10 }} label="Password" />
      {props.children}
      <MyButton
        style={{ marginTop: 15 }}
        variant="contained"
        color="primary"
        onClick={() => console.log('logged in!')}
      >
        Login
      </MyButton>
    </form>
  );
};

MyForm.propTypes = {};

export default MyForm;
