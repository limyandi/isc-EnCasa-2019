import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from '@material-ui/pickers';

const TimePicker = props => {
  const { date, onChange } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={date}
          onChange={onChange}
          KeyboardButtonProps={{
            'aria-label': 'change time'
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default TimePicker;
