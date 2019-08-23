import { Fab } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1)
  }
}));

const FloatingActionButton = props => {
  const classes = useStyles();
  // the button type if needed for form submission
  const { color, ariaLabel, onClick } = props;

  return (
    <div>
      <Fab
        color={color}
        aria-label={ariaLabel}
        className={classes.fab}
        onClick={onClick}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

FloatingActionButton.defaultProps = {
  color: 'primary',
  onClick: () => console.log('on Click not implemented')
};

FloatingActionButton.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary']),
  onClick: PropTypes.func
};

export default FloatingActionButton;
