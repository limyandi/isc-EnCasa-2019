import { Button } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const MyButton = props => {
  // the button type if needed for form submission
  const { color, children, onClick, type, variant } = props;

  return (
    <div>
      <Button
        onClick={onClick}
        color={color}
        type={type}
        variant={variant}
        {...props}
      >
        {children}
      </Button>
    </div>
  );
};

MyButton.defaultProps = {
  color: 'primary',
  type: 'button',
  onClick: () => console.log('on Click not implemented'),
  variant: 'contained'
};

MyButton.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary']),
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  variant: PropTypes.string
};

export default MyButton;
