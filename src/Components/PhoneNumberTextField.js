import MuiPhoneNumber from 'material-ui-phone-number';
import React from 'react';
import PropTypes from 'prop-types';

const MyPhoneNumberTextField = props => {
  const { onChange, value, label, name, required, style, type } = props;

  const rootStyle = {
    marginBottom: 10,
    ...style
  };
  return (
    <div className={rootStyle}>
      <MuiPhoneNumber
        defaultCountry="au"
        onlyCountries={['au']}
        required={required}
        type={type}
        onChange={onChange}
        value={value}
        label={label}
        name={name}
        {...props}
      />
    </div>
  );
};

MyPhoneNumberTextField.defaultProps = {
  type: 'text',
  autoFocus: false
};

export default MyPhoneNumberTextField;
