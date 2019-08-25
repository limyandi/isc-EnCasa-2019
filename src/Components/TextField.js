import { TextField } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const MyTextField = props => {
  const { onChange, label, value, name, type, autoFocus } = props;

  return (
    <div>
      <TextField
        type={type}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        {...props}
      />
    </div>
  );
};

MyTextField.defaultProps = {
  type: 'text',
  autoFocus: false
};

MyTextField.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool,
  // TODO: Does not have to be string.
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string
};

export default MyTextField;
