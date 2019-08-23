import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const MySwitch = props => {
  const { onChange, checked, value, label } = props;
  return (
    <FormControlLabel
      control={<Switch checked={checked} onChange={onChange} value={value} />}
      label={label}
    />
  );
};

export default MySwitch;
