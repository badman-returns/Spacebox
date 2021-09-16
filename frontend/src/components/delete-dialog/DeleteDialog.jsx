import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DeleteDialog = ({
    SetOpen,
    handleClose,
    title,
    content,
    handleConfirm,
    confirmButtonColorSecondary,
}) => {
    return (
        <Dialog
            open={SetOpen}
            onClose={handleClose}
            maxWidth={"xs"}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            {content !== '' && (
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
            )}

            <DialogActions>
                <Button
                    onClick={handleClose}
                    variant="text"
                    color="primary"
                    style={{ color: '#333333' }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleConfirm}
                    variant="contained"
                    color={confirmButtonColorSecondary ? 'secondary' : 'primary'}
                    // color="primary"
                    autoFocus
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteDialog;