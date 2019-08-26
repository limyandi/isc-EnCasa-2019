import React from 'react';
import Typography from '@material-ui/core/Typography';

const Header = props => {
  const { variant, children, style } = props;

  const propsStyle = {
    marginTop: 20,
    ...style
  };

  return (
    <Typography variant={variant} gutterBottom style={propsStyle}>
      {children}
    </Typography>
  );
};

Header.defaultProps = {
  variant: 'h3'
};

export default Header;
