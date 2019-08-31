/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const MyHyperLink = props => {
  const { children, to } = props;
  return (
    <RouterLink to={to}>
      <Link variant="body1" type="button" {...props}>
        {children}
      </Link>
    </RouterLink>
  );
};

MyHyperLink.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

export default MyHyperLink;
