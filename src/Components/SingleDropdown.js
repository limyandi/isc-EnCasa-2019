import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const SingleDropdown = props => {
  const { value, onChange, label, name, data } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
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
              return <MenuItem value={oneData.ID}>{oneData.name}</MenuItem>;
            })}
        </Select>
      </FormControl>
    </div>
  );
};

export default SingleDropdown;
