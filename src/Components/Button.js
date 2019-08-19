import {Button} from '@material-ui/core'
import React from 'react';
import PropTypes from "prop-types";

const MyButton = (props) => {
    const { ...other } = props

  return (
    <div><Button {...other} color={props.color}>{props.children}</Button></div>
  );
}

MyButton.propTypes = {
    color: PropTypes.oneOf(['primary', 'secondary'])
}

export default MyButton;
