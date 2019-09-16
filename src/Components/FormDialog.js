import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

const FormDialog = props => {
  const {
    handleClose,
    handleSubmit,
    dialogTitle,
    dialogText,
    open,
    children,
    cancelText,
    confirmText,
    disableConfirmButton,
    fullWidth
  } = props;
  //   const [open, setOpen] = React.useState(false);

  // function handleClickOpen() {
  //   setOpen(true);
  // }

  // function handleClose() {
  //   setOpen(false);
  // }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="xs"
        fullWidth={fullWidth}
      >
        <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogText}</DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {cancelText}
          </Button>
          {handleSubmit && (
            <Button
              disabled={disableConfirmButton}
              onClick={handleSubmit}
              color="primary"
            >
              {confirmText}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

// TODO :Prop-types
FormDialog.defaultProps = {
  cancelText: 'cancel',
  confirmText: 'confirm'
};

FormDialog.propTypes = {
  children: PropTypes.node.isRequired,
  dialogTitle: PropTypes.string.isRequired,
  dialogText: PropTypes.string.isRequired,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string
};
export default FormDialog;
