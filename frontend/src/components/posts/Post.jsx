import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CssBaseline, CardContent, Typography, Avatar, Divider } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AlertDialog from '../alert-dialog/AlertDialog';
import { DeletePostById } from '../../services/post.service';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


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
    delete: {
        cursor: 'pointer',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));


const Post = (props) => {

    const [open, setOpen] = React.useState(false);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    const handleDelete = () => {
        setOpenConfirmationDialog(true);
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
            await DeletePostById(data);
            props.getPosts();
            handleClose();
        } catch (error) {
            console.log(error);
        }
    }

    const classes = useStyles();
    return (
        <div>
            <Card>
                <CssBaseline />
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container spacing={1} justifyContent="space-between" alignItems="center">
                                <Grid item>
                                    <Grid container>
                                        <Grid item>
                                            <Avatar src={props.avatarURL ? props.avatarURL : props.avatarURL} />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h6" component="h4">
                                                {props.name}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {props.activity === true && (
                                    <Grid item>
                                        <DeleteIcon className={classes.delete} onClick={handleDelete} />
                                    </Grid>
                                )}
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
            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default Post;
