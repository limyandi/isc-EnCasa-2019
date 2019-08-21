import React from 'react';
import Typography from '@material-ui/core/Typography';

const Header = props => {
  const { variant, children } = props;

  return (
    <Typography variant={variant} gutterBottom>
      {children}
    </Typography>
  );
};

Header.defaultProps = {
  variant: 'h3'
};

export default Header;
