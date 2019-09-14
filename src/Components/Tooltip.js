import React from 'react';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const MyTooltip = props => {
  const { label, placement, children } = props;

  return (
    <Tooltip title={label} placement={placement}>
      {children || (
        <IconButton>
          <HelpIcon style={{ color: 'white' }} />
        </IconButton>
      )}
    </Tooltip>
  );
};

export default MyTooltip;
