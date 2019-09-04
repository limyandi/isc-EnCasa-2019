import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(2)
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3)
  }
}));

const Tooltip = props => {
  const { label } = props;

  return (
    <div>
      <Tooltip title={label}>
        <IconButton aria-label="delete">
          <HelpIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default Tooltip
