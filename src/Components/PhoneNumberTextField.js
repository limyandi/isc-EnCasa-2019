import MuiPhoneNumber from 'material-ui-phone-number';
import React from 'react';
import PropTypes from 'prop-types';

const MyPhoneNumberTextField = props => {
  const { onChange, value, label, name, required, style } = props;

  const rootStyle = {
    marginBottom: 10,
    ...style
  };
  return (
    <div style={rootStyle}>
      <MuiPhoneNumber
        defaultCountry="au"
        onlyCountries={['au']}
        required={required}
        onChange={onChange}
        value={value}
        label={label}
        name={name}
      />
    </div>
  );
};

export default MyPhoneNumberTextField;
