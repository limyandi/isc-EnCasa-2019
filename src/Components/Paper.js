import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'inline-block'
  },
  paper: {
    padding: theme.spacing(4, 10)
  }
}));

const PaperSheet = props => {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} {...props}>
        {children}
      </Paper>
    </div>
  );
};

export default PaperSheet;
