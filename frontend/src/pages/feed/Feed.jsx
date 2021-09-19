import Grid from '@material-ui/core/Grid'
import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Post from '../../components/posts/Post';
import { setPosts } from '../../store/actions/postAction';
import { GetPost, createPost } from '../../services/post.service';
import { Container, Card, CardContent, Typography, Button } from '@material-ui/core';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import LinearProgress from '@material-ui/core/LinearProgress';
import SendIcon from '@material-ui/icons/Send';

const Feed = () => {

    let posts = useSelector((state => state.posts.posts));
    let { _id } = useSelector((state => state.userInfo.user));
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [content, setContent] = useState(null);
    const [files, setFiles] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null)
    const inputRef = useRef();

    const classes = useStyles();
    const dispatch = useDispatch();

    const onFileChange = (event) => {
        if (event.target.files.length > 0) {
            const files = event.target.files[0];
            setFiles(files);
            setSelectedFile(URL.createObjectURL(event.target.files[0]))
        }
    };

    const savePost = async () => {
        const formData = new FormData();
        formData.append('id', _id);
        if (content !== null) {
            formData.append('content', content);
        }
        if (files) {
            formData.append('post', files);
        }
        if ((files && files.length) || content !== null) {
            try {
                inputRef.current.value = '';
                setUploading(true);
                setSelectedFile(null);
                let postEditResponse = await createPost(formData);
                if (postEditResponse.status === 200) {
                    setContent(null);
                    setFiles(null);
                }
                let postGetResponse = await GetPost();
                if (postGetResponse.status === 200) {
                    dispatch(setPosts(postGetResponse.data.ResponseData));
                    setUploading(false);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        setLoading(true);
        GetPost().then((response) => {
            dispatch(setPosts(response.data.ResponseData));
            setLoading(false);
        }).catch((error) => {
            console.log(error);
        });
    }, [dispatch]);

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={1} lg={3} xl={4} className={classes.panel}>
                </Grid>
                <Grid item xs={10} lg={6} xl={4} className={classes.feed}>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12}>
                            <Card>
                                <CardContent>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <textarea placeholder="Share what's on your mind" ref={inputRef} className={classes.inputBox} onInput={(e) => setContent(e.target.value)} />
                                        </Grid>
                                        {selectedFile && (<Grid container justifyContent="center">
                                            <img
                                                src={selectedFile ? selectedFile : null}
                                                alt="developer"
                                                className={classes.image}
                                            />
                                        </Grid>)}
                                        <Grid item xs={2}>
                                            <input
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                id="file-input"
                                                multiple
                                                type="file"
                                                onChange={onFileChange}
                                            />
                                            <label htmlFor="file-input">
                                                <div className={classes.addPhoto}>
                                                    <PhotoCameraIcon />
                                                    <Typography variant='body2' className={classes.photoText}>Add Photo</Typography>
                                                </div>
                                            </label>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Grid container justifyContent='flex-end'>
                                                <Button className={classes.sendLarge} variant="contained" color="primary" onClick={savePost}>
                                                    Create Post
                                                </Button>
                                                <Button className={classes.sendSmall} variant="contained" color="primary" onClick={savePost}>
                                                    <SendIcon />
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        {uploading && (
                            <Grid item className={classes.post}>
                                <Card>
                                    <CardContent>
                                        <Typography variant='h6'>Creating Post...</Typography>
                                        <LinearProgress />
                                    </CardContent>
                                </Card>
                            </Grid>
                        )}
                        <Container>
                            {!loading && posts && posts.length && posts.map((post) => (
                                <Grid container spacing={4} key={post._id}>
                                    <Grid item className={classes.post}>
                                        <Post id={post.userId._id}
                                            name={post.userId.name}
                                            avatarURL={post.userId.picURL}
                                            content={post.content}
                                            imageURL={post.imageURL} />
                                    </Grid>
                                </Grid>
                            ))}
                        </Container>
                    </Grid>
                </Grid>
                <Grid item xs={1} lg={3} xl={4} className={classes.feed}>
                </Grid>
            </Grid>

        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        paddingTop: '80px',
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    panel: {
        height: '100vh'
    },
    activity: {
        height: '100vh'
    },
    feed: {
        height: '100vh'
    },
    inputBox: {
        width: '100%',
        minHeight: '120px',
        fontSize: '20px',
        outline: 0,
        border: 0,
        paddingTop: '10px 0px',
        letterSpacing: '1px',
        fontFamily: 'sans-serif'
    },
    addPhoto: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer'
    },
    image: {
        width: '50%'
    },
    post: {
        width: 'inherit'
    },
    photoText: {
        '@media (max-width: 600px)': {
            display: 'none',
        }
    },
    sendLarge: {
        '@media (max-width: 1280px)': {
            display: 'none'
        }
    },
    sendSmall: {
        '@media (min-width: 1280px)': {
            display: 'none'
        }
    }
}));

export default Feed;