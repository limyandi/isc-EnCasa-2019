import React from 'react';
import PropTypes from "prop-types";
import MyButton from './Button';
import MyTextField from './TextField';

const MyForm = (props) => {
    const formStyle = {
        display: 'inline-block',
        margin: 'auto',
        textAlign: 'center'
    }

  return (
        <form style={formStyle}>
            <MyTextField label="Username"/>
            <MyTextField label="Password"/>
            <MyButton variant="contained" color="primary" onClick={() => console.log('logged in!')}>Login</MyButton>
        </form>
  );
}

MyForm.propTypes = {
   
}

export default MyForm;
