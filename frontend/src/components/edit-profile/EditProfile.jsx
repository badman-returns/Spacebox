import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { EditProfileService, GetProfileService } from '../../services/profile.service';
import { setUserInfo, setUserProfile } from '../../store/actions/userActions';
import { useDispatch } from 'react-redux';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const EditProfile = ({
    SetOpen,
    handleClose,
    title,
    data,
    toaster
}) => {

    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [techStack, setTechStack] = useState('');
    const [files, setFiles] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null)
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

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
        handleStartLoader();
        const formData = new FormData();
        if (selectedFile) {
            formData.append('profile', files);
            formData.append('pictureId', data.picId);

        }
        formData.append('name', name);
        formData.append('bio', bio);
        formData.append('techStack', techStack);

        try {
            const response = await EditProfileService(formData);
            const responseData = await GetProfileService(data._id)
            dispatch(setUserInfo(responseData.data.ResponseData));
            dispatch(setUserProfile(responseData.data.ResponseData));
            toaster(response);
            handleStopLoader();
            handleClose();
        } catch (error) {
            console.log(error);
        }
    }

    const setDefault = () => {
        setName('');
        setBio('');
        setTechStack('');
    }

    useEffect(() => {
        setName(data.name);
        setBio(data.bio);
        setTechStack(data.techStack);
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
                        {data.picURL && selectedFile == null && (
                            <img src={data.picURL} alt='profilepic' style={{
                                width: '50%',
                                borderRadius: '50%',
                            }} />
                        )
                        }
                        {selectedFile && (
                            <img src={selectedFile} alt='profilepic' style={{
                                width: '20%',
                            }} />
                        )}
                        {!selectedFile && data.picURL === '' && (
                            <Typography variant='h6'>Add new Profile Picture</Typography>
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
                            <TextField
                                label="Name"
                                variant="outlined"
                                fullWidth
                                value={name}
                                onInput={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Bio"
                                variant="outlined"
                                fullWidth
                                value={bio}
                                onInput={(e) => setBio(e.target.value)}
                            />
                        </Grid>
                        {data.role === 'developer' && (<Grid item xs={12}>
                            <TextField
                                label="Tech Stack"
                                variant="outlined"
                                fullWidth
                                value={techStack}
                                onInput={(e) => setTechStack(e.target.value)}
                            />
                        </Grid>)}
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
}));

export default EditProfile;