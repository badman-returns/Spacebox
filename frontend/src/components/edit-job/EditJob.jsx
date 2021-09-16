import React, { useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { EditJobService, GetJobByUserId } from '../../services/job.service';
import { setUserJobs } from '../../store/actions/jobAction';
import { useDispatch } from 'react-redux';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import ReactQuill from 'react-quill';
import '../../../node_modules/react-quill/dist/react-quill';

const EditJob = ({
    SetOpen,
    handleClose,
    heading,
    data,
    toasterSuccess,
    toasterFailure
}) => {

    const dispatch = useDispatch();
    const descriptionRef = useRef();
    const [title, setTitle] = useState(false);
    const [company, setCompany] = useState(false);
    const [location, setLocation] = useState(false);
    const [description, setDescription] = useState(false);
    const [open, setOpen] = useState(false);


    const handleStopLoader = () => {
        setOpen(false);
    };
    const handleStartLoader = () => {
        setOpen(!open);
    };

    const handleSave = async () => {
        handleStartLoader();
        const editedData = {
            title: title,
            company: company,
            location: location,
            description: description,
            userId: data.createdBy._id,
        }

        try {
            const editResponse = await EditJobService(data._id, editedData);
            if (editResponse.status === 200) {
                const response = await GetJobByUserId(data.createdBy._id)
                if (response.status === 200) {
                    dispatch(setUserJobs(response.data.ResponseData));
                    handleStopLoader();
                    handleClose();
                    toasterSuccess(editResponse.data.ResponseMessage);
                }
            }
        } catch (error) {
            toasterFailure('Something went wrong');
            handleStopLoader();
            console.log(error);
        }
    }

    const setDefault = () => {
        setTitle('');
        setCompany('');
        setLocation('');
        setDescription('');
    }

    useEffect(() => {
        setTitle(data.title);
        setCompany(data.company)
        setLocation(data.location);
        setDescription(data.description)
        return () => {
            setDefault();
        }
    }, [data]);

    const classes = useStyles();

    return (
        <Dialog
            open={SetOpen}
            onClose={handleClose}
            maxWidth={"lg"}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{heading}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Grid container justifyContent='center' spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Title"
                                variant="outlined"
                                fullWidth
                                value={title}
                                onInput={(e) => setTitle(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Company"
                                variant="outlined"
                                fullWidth
                                value={company}
                                onInput={(e) => setCompany(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Location"
                                variant="outlined"
                                fullWidth
                                value={location}
                                onInput={(e) => setLocation(e.target.value)}
                            />
                            <Grid item lg={12}>
                                <ReactQuill ref={descriptionRef}
                                    value={description}
                                    onChange={(e) => setDescription(e)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContentText>
            </DialogContent >
            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>

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
                    onClick={handleSave}
                    variant="contained"
                    color="primary"
                    autoFocus
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog >
    );
};

const useStyles = makeStyles((theme) => ({
    profilePic: {
        width: '20%',
        borderRadius: '50%',
    },
    editPicButton: {
        margin: '10px 0px',
    },
    chips: {
        margin: '15px 5px',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    inputBox: {
        width: '100%',
        minWidth: '200px',
        minHeight: '300px',
        fontSize: '20px',
        outline: 0,
        border: 0,
        paddingTop: '10px 0px',
        letterSpacing: '1px',
        fontFamily: 'sans-serif'
    },
}));

export default EditJob;