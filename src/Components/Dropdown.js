import React from 'react';
import Select from '@material-ui/core/Select';
import {
  Input,
  MenuItem,
  FormControl,
  Checkbox,
  ListItemText,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const MyDropdown = props => {
  const classes = useStyles();
  const { value, onChange, valueLists } = props;

  return (
    <FormControl className={classes.formControl}>
      <Select
        multiple
        value={value}
        onChange={onChange}
        input={<Input id="select-multiple-checkbox" />}
        renderValue={selected => {
          let renderValue = '';
          // eslint-disable-next-line no-return-assign
          selected.map(s => (renderValue += `${s.name}, `));
          return renderValue;
        }}
        MenuProps={MenuProps}
      >
        {valueLists.map(val => {
          return (
            <MenuItem key={val.id} value={val}>
              <Checkbox checked={value.findIndex(i => i.id === val.id) > -1} />
              <ListItemText primary={val.name} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default MyDropdown;
