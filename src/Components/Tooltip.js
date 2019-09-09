import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const MyTooltip = props => {
  const { label, placement } = props;

  return (
    <Tooltip title={label} placement={placement}>
      <IconButton>
        <HelpIcon style={{ color: 'white' }} />
      </IconButton>
    </Tooltip>
  );
};

export default MyTooltip;
