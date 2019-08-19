import { TextField } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const MyTextField = props => {
  const { onChange, label, value, name } = props;

  return (
    <div>
      <TextField label={label} name={name} value={value} onChange={onChange} {...props} />
    </div>
  );
};

MyTextField.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  // TODO: Does not have to be string.
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default MyTextField;
