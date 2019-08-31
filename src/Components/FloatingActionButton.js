import { Fab } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1)
  }
}));

const FloatingActionButton = props => {
  const classes = useStyles();
  // the button type if needed for form submission
  const { color, ariaLabel, onClick, children, style } = props;

  return (
    <div>
      <Fab
        style={{ marginLeft: 20, ...style }}
        color={color}
        aria-label={ariaLabel}
        className={classes.fab}
        onClick={onClick}
      >
        {children}
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
