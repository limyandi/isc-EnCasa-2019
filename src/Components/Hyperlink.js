/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const MyHyperLink = props => {
  const { children, variant, to } = props;
  return (
    <RouterLink to={to}>
      <Link type="button" variant={variant} {...props}>
        {children}
      </Link>
    </RouterLink>
  );
};

MyHyperLink.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

MyHyperLink.defaultProps = {
  variant: 'body'
};

export default MyHyperLink;
