import React, { useState, useEffect } from 'react'
import { Grid, CardContent, Typography, Card, Button, Chip } from '@material-ui/core'
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import EditProfile from '../edit-profile/EditProfile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    let profileUser = useSelector((state => state.profileInfo.user));
    let loggedUser = useSelector((state => state.userInfo.user));

    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const [currentData, setCurrentData] = useState({});

    const [permission, setPermission] = useState();

    const invokePermission = () => {
        if (loggedUser._id === profileUser._id) {
            setPermission(true);
        }
        else {
            setPermission(false);
        }
    }

    const toasterSuccess = (message) => {
        toast.success(message);
    }

    const toasterFailure = (message) => {
        toast.error(message);
    }

    const handleEdit = () => {
        setOpenConfirmationDialog(true);
        setCurrentData(loggedUser);
    }

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
        }
    }));

    useEffect(() => {
        invokePermission();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profileUser]);

    const classes = useStyles();

    return (
        <>

            <Card >
                <CardContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <Grid container justifyContent='center'>
                                <Grid item xs={8}>
                                    <Grid container justifyContent='center'>
                                        {
                                            profileUser.picURL ? (<img src={profileUser.picURL} className={classes.profilePic} alt='profile' />) :
                                                (<>
                                                    <img src={process.env.PUBLIC_URL + 'user-portrait.png'} className={classes.profilePic} alt='nopic' />
                                                </>
                                                )
                                        }
                                                    </Grid>
                                                    <Grid container justifyContent='center'>
                                                        <Typography variant='h4'>{profileUser.name}</Typography>
                                                    </Grid>
                                                    <Grid container justifyContent='center'>
                                                        <Typography variant='body2'>{profileUser.bio}</Typography>
                                                    </Grid>
                                                    <Grid container justifyContent='center'>
                                                        {profileUser.role === 'developer' && profileUser && profileUser.techStack && profileUser.techStack.map((stack) => (
                                                            <Grid key={stack}>
                                                                <Chip className={classes.chips} label={stack} />
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                    {permission && (<Grid container justifyContent='center'>
                                                        <Button className={classes.editPicButton} variant='contained' color="primary" onClick={handleEdit}><EditIcon />Edit</Button>
                                                    </Grid>)}
                                                </Grid>
                            </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <EditProfile
                        SetOpen={openConfirmationDialog}
                        handleClose={() => setOpenConfirmationDialog(false)}
                        data={currentData}
                        toasterSuccess={toasterSuccess}
                        toasterFailure={toasterFailure}
                        title="Edit Profile"
                        confirmButtonColorSecondary={false}
                    />
                    <ToastContainer
                        position="bottom-right"
                        autoClose={2000}
                        theme='light'
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        pauseOnHover
                    />
                </>
                )
}

                export default Profile
