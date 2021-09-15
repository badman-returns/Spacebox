import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CssBaseline, CardContent, Typography, Avatar, Divider } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AlertDialog from '../alert-dialog/AlertDialog';
import { DeletePostById } from '../../services/post.service';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CreateIcon from '@material-ui/icons/Create';
import EditPost from '../EditPost/EditPost';

const useStyles = makeStyles((theme) => ({
    contentImage: {
        width: '100%',
    },
    contentText: {
        fontSize: '15px',
        fontFamily: 'sans-serif',
        paddingTop: '10px 0px',
        letterSpacing: '1px',
    },
    icon: {
        cursor: 'pointer',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    linkText: {
        textDecoration: 'none',
        color: '#000',
    }
}));


const Post = (props) => {

    const [open, setOpen] = useState(false);
    const [permission, setPermission] = useState();
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const loggedUser = useSelector(state => state.userInfo.user);

    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    const toasterSuccess = (message) => {
        toast.success(message);
    }

    const toasterFailure = (message) => {
        toast.error(message);
    }

    const handleDelete = () => {
        setOpenConfirmationDialog(true);
    }

    const handleEdit = () => {
        setOpenEditDialog(true);
    }

    const confirmDeletePost = async () => {
        handleToggle();
        setOpenConfirmationDialog(false);
        try {
            let data = {
                id: props.id,
                userId: props.userId,
                imageId: props.imageId
            }
            const response = await DeletePostById(data);
            if (response.status === 200) {
                props.getPosts();
                toast.success(response.data.ResponseMessage);
            }
            else {
                toast.failure('Something went wrong');
            }
            handleClose();
        } catch (error) {
            console.log(error);
        }
    }

    const invokePermission = () => {
        if (loggedUser._id === props.userId) {
            setPermission(true);
        } else {
            setPermission(false);
        }
    }

    useEffect(() => {
        invokePermission();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.userId]);

    const classes = useStyles();
    return (
        <div>
            <Card>
                <CssBaseline />
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container spacing={1} justifyContent="space-between" alignItems="center">
                                <Grid item xs={8}>
                                    <Grid container alignItems='center' spacing={1}>
                                        <Grid item>
                                            <Link className={classes.linkText} to={`/in/profile/${props.id}`}>
                                                <Avatar src={props.avatarURL ? props.avatarURL : props.avatarURL} />
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h6" component="h4">
                                                <Link className={classes.linkText} to={`/in/profile/${props.id}`}>{props.name}</Link>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={4}>
                                    {props.activity === true && permission && (
                                        <Grid container justifyContent='flex-end' spacing={2}>
                                            <Grid item>
                                                <CreateIcon className={classes.icon} onClick={handleEdit} />
                                            </Grid>
                                            <Grid item>
                                                <DeleteIcon className={classes.icon} onClick={handleDelete} />
                                            </Grid>
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1} justifyContent="center" alignItems="center">
                                <Grid item xs={12}>
                                    <p className={classes.contentText}>
                                        {props.content ? props.content : null}
                                    </p>
                                </Grid>
                                <Grid item xs={12}>
                                    {
                                        props.imageURL &&
                                        (<LazyLoadImage
                                            effect='blur'
                                            useIntersectionObserver
                                            className={classes.contentImage} src={props.imageURL} alt='postimage' />
                                        )
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <AlertDialog
                SetOpen={openConfirmationDialog}
                handleClose={() => setOpenConfirmationDialog(false)}
                title="Delete Post"
                content="Are you sure want to delete this post?"
                handleConfirm={confirmDeletePost}
                confirmButtonColorSecondary={false}
            />
            <EditPost
                SetOpen={openEditDialog}
                handleClose={() => setOpenEditDialog(false)}
                data={props}
                toasterSuccess={toasterSuccess}
                toasterFailure={toasterFailure}
                title="Edit Post"
                confirmButtonColorSecondary={false}
            />
            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
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
        </div>
    )
}

export default Post;
