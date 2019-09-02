import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { FormControlLabel } from '@material-ui/core';

const MyCheckbox = props => {
  const { onChange, checked, value, name, label } = props;

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            name={name}
            checked={checked}
            onChange={onChange}
            value={value}
            inputProps={{
              'aria-label': 'primary checkbox'
            }}
          />
        }
        label={label}
      />
    </div>
  );
};

export default MyCheckbox;
