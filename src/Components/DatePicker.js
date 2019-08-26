import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

const DatePicker = props => {
  const { selectedDate, onChange } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM-dd-yyyy"
          value={selectedDate}
          //   inputProps={{ name: 'date' }}
          onChange={onChange}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
          disablePast
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
