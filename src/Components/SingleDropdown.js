import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const SingleDropdown = props => {
  const { value, onChange, label, name, data, withAddress, style } = props;

  const rootStyle = {
    marginBottom: 10,
    display: 'flex',
    flexWrap: 'wrap',
    ...style
  };

  return (
    <div style={rootStyle}>
      <FormControl style={{ minWidth: 150 }}>
        <InputLabel htmlFor="age-simple">{label}</InputLabel>
        <Select
          value={value}
          onChange={onChange}
          inputProps={{
            name
          }}
        >
          {data &&
            data.map(oneData => {
              return (
                <MenuItem value={oneData.ID}>
                  {oneData.name} {withAddress ? oneData.address : null}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </div>
  );
};

SingleDropdown.defaultProps = {
  withAddress: false
};

export default SingleDropdown;
