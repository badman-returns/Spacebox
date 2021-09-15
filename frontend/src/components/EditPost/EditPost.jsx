import React, { useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Typography from '@material-ui/core/Typography';
import { GetPostByUserId, EditPostById } from '../../services/post.service';
import { setPostById } from '../../store/actions/postAction';
import { useDispatch } from 'react-redux';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const EditPost = ({
    SetOpen,
    handleClose,
    title,
    data,
    toasterSuccess,
    toasterFailure
}) => {

    const [content, setContent] = useState('');
    const [files, setFiles] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null)
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const inputRef = useRef();


    const onFileChange = (event) => {
        if (event.target.files.length > 0) {
            const files = event.target.files[0];
            setFiles(files);
            setSelectedFile(URL.createObjectURL(event.target.files[0]))
        }
    };


    const handleStopLoader = () => {
        setOpen(false);
    };
    const handleStartLoader = () => {
        setOpen(!open);
    };

    const handleSave = async () => {
        console.log(data);
        handleStartLoader();
        const formData = new FormData();
        if (selectedFile) {
            formData.append('edit', files);
        }
        formData.append('content', content);
        formData.append('userId', data.userId);

        try {
            const editResponse = await EditPostById(data.id, formData);
            if (editResponse.status === 200) {
                const response = await GetPostByUserId( data.userId._id)
                if (response.status === 200) {
                    dispatch(setPostById(response.data.ResponseData));
                    handleStopLoader();
                    handleClose();
                    toasterSuccess(editResponse.data.ResponseMessage);
                }
            }
        } catch (error) {
            toasterFailure('Something went wrong');
            console.log(error);
        }
    }

    const setDefault = () => {
        setContent('');
    }

    useEffect(() => {
        setContent(data.content);
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
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Grid container justifyContent='center'>
                        {data.imageURL && selectedFile == null && (
                            <img src={data.imageURL} alt='profilepic' style={{
                                width: '50%',
                            }} />
                        )
                        }
                        {selectedFile && (
                            <img src={selectedFile} alt='profilepic' style={{
                                width: '50%',
                            }} />
                        )}
                        {!selectedFile && data.imageURL === '' && (
                            <Typography variant='h6'>Add Picture</Typography>
                        )}
                    </Grid>
                    <Grid container justifyContent='center'>
                        <Grid item>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="file-input"
                                multiple
                                type="file"
                                onChange={onFileChange}
                            />
                            <div>
                                <Button style={{ margin: '10px 0px' }} variant='contained' color="primary">
                                    <label htmlFor="file-input" style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        cursor: 'pointer'
                                    }}>
                                        <PhotoCameraIcon />Upload
                                    </label>
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent='center' spacing={2}>
                        <Grid item xs={12}>
                                <textarea value={content} ref={inputRef} className={classes.inputBox} onInput={(e) => setContent(e.target.value)} />
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

export default EditPost;