import React, { useEffect, useState } from 'react'
import { Grid, CardContent, Typography, Card, Tabs, Tab, Drawer } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { FetchGitHubProjects } from '../../services/github.service';
import { GetPostByUserId } from '../../services/post.service';
import { useSelector, useDispatch } from "react-redux";
import { setProjects } from '../../store/actions/projectActions';
import { setPostById } from '../../store/actions/postAction';
import Post from '../posts/Post';
import Chip from '@material-ui/core/Chip';


const ProjectsAndActivities = (props) => {
    let { repos_url } = useSelector((state => state.userGitInfo.user));
    let userGitProjects = useSelector((state => state.githubProjects.projects));
    let { role, _id } = useSelector((state => state.profileInfo.user));
    let posts = []
    posts = useSelector((state => state.userPosts.posts));

    const [done, setDone] = useState(false);

    let projects = [];
    if (userGitProjects != null) {
        // eslint-disable-next-line array-callback-return
        userGitProjects.map((project) => {
            if (project.fork !== true){
                projects.push(project);
            }
        })
    }


    const dispatch = useDispatch();

    const [value, setValue] = useState(0);

    const handleChange = (e, value) => {
        setValue(value);
    }

    const GetProjectData = async () => {
        try {
            const response = await FetchGitHubProjects(repos_url);
            if (response.status === 200) {
                dispatch(setProjects(response.data));
            }
            setDone(true);
        } catch (error) {
            console.log(error);
        }
    };

    const GetPostsById = async () => {
        try {
            const response = await GetPostByUserId(_id);
            if (response.status === 200) {
                dispatch(setPostById(response.data.ResponseData));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        GetProjectData();
        GetPostsById();
        return () => {
            setValue(0);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_id]);

    const useStyles = makeStyles({
        hideLongText: {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            height: '100px',
        },
        link: {
            textDecoration: 'none',
            textDecorationStyle: 'none'
        },
        name: {
            textTransform: 'capitalize'
        },
        image: {
            width: '50%',
        },
        post: {
            width: 'inherit'
        }
    });

    const classes = useStyles();

    return (
        <div>
            <div>
                {done && (<Card >
                    <CardContent>
                        <Grid container justifyContent='center'>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                            >
                                {role === 'developer' && (<Tab label="Projects" />)}
                                {role === 'recruiter' && (<Tab label="Job Posted" />)}

                                <Tab label="Activities" />
                            </Tabs>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                {value === 0 && role === 'developer' && (<Grid container spacing={2}>
                                    {projects.reverse().map((project) => (
                                        <Grid item xs={12} lg={4} key={project.id}>
                                            <a className={classes.link} href={project.html_url} rel="noreferrer" target='_blank'>
                                                <Card>
                                                    <CardContent>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12}>
                                                                <Typography className={classes.name} variant='h5'>{project.name}</Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <div className={classes.hideLongText}><Typography>{project.description}</Typography></div>
                                                                <Drawer />
                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                <Chip color='primary' label={project.language} />
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </Card>
                                            </a>
                                        </Grid>
                                    ))}
                                </Grid>)}
                            </Grid>
                        </Grid>
                        {value === 1 && (<Grid container>
                            <Grid item xs={1} lg={2} xl={3} className={classes.panel}>
                            </Grid>
                            <Grid item xs={10} lg={8} xl={6} className={classes.feed}>
                                <Grid container spacing={2} justifyContent="center" alignItems="center">
                                    {posts && posts.length && posts.map((post) => (
                                        <div key={post._id}>
                                            {post.userId._id === _id && (
                                                <Grid item className={classes.post}>
                                                    <Post
                                                        id={post._id}
                                                        userId={post.userId._id}
                                                        name={post.userId.name}
                                                        activity={true}
                                                        avatarURL={post.userId.picURL}
                                                        content={post.content}
                                                        imageId={post.imageId}
                                                        imageURL={post.imageURL}
                                                        getPosts={GetPostsById} />
                                                </Grid>
                                            )}
                                        </div>
                                    ))}
                                </Grid>
                            </Grid>
                            <Grid item xs={1} lg={2} xl={3} className={classes.feed}>
                            </Grid>
                        </Grid>
                        )}
                    </CardContent>
                </Card>)}
            </div>
        </div >
    )
}

export default ProjectsAndActivities