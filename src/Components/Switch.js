import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const MySwitch = props => {
  const { onChange, checked, value, label, visible, style } = props;

  const switchStyle = {
    display: visible ? 'block' : 'none',
    ...style
  };
  return (
    <FormControlLabel
      control={<Switch checked={checked} onChange={onChange} value={value} />}
      label={label}
      style={switchStyle}
    />
  );
};

export default MySwitch;
