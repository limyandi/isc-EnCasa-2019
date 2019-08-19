import {TextField} from '@material-ui/core'
import React from 'react';
import PropTypes from "prop-types";

const MyTextField = (props) => {
    const { ...other } = props
  return (
    <div><TextField {...other} label={props.label}/></div>
  );
}

MyTextField.propTypes = {
    label: PropTypes.string.isRequired
}

export default MyTextField;
