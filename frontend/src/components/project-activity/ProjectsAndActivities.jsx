import React, { useEffect, useState, useCallback } from 'react'
import { Grid, CardContent, Typography, Card, Tabs, Tab, Drawer } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { FetchGitHubProjects } from '../../services/github.service';
import { GetPostByUserId } from '../../services/post.service';
import { useSelector, useDispatch } from "react-redux";
import { setProjects } from '../../store/actions/projectActions';
import { setPostById } from '../../store/actions/postAction';
import Post from '../posts/Post';
import Chip from '@material-ui/core/Chip';


const ProjectsAndActivities = () => {
    let { repos_url } = useSelector((state => state.userGitInfo.user));
    let userGitProjects = useSelector((state => state.githubProjects.projects));
    let { role, _id } = useSelector((state => state.userInfo.user));
    let posts = []
    posts = useSelector((state => state.userPosts.posts));
    console.log(posts);

    const projects = [];
    userGitProjects.map((project) => {
        if (project.fork === false) {
            projects.push(project);
        }
        return null;
    });

    const dispatch = useDispatch();

    const [value, setValue] = useState(1);

    const handleChange = (e, value) => {
        setValue(value);
    }

    const GetProjectData = useCallback(async () => {
        try {
            const response = await FetchGitHubProjects(repos_url);
            dispatch(setProjects(response));
        } catch (error) {
            console.log(error);
        }
    }, [repos_url, dispatch])

    const GetPostsById = useCallback(async () => {
        try {
            const response = await GetPostByUserId(_id);
            dispatch(setPostById(response));
        } catch (error) {
            console.log(error);
        }
    }, [_id, dispatch])

    useEffect(() => {
        GetProjectData();
        GetPostsById();

    }, [GetProjectData, GetPostsById]);

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
        }
    });

    const classes = useStyles();

    return (
        <div>
            <div>
                <Card >
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
                            <Grid item xs={3} className={classes.panel}>
                            </Grid>
                            <Grid item xs={6} className={classes.feed}>
                                <Grid container spacing={2} justifyContent="center" alignItems="center">
                                    {posts && posts.length && posts.map((post) => (
                                        <Grid item className={classes.post} key={post._id}>
                                            <Post
                                            id={post._id}
                                            userId={post.userId} 
                                            name={post.name} 
                                            activity={true} 
                                            avatarURL={post.avatarURL} 
                                            content={post.content} 
                                            imageId={post.imageId}
                                            imageURL={post.imageURL}
                                            getPosts={GetPostsById} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                            <Grid item xs={3} className={classes.feed}>
                            </Grid>
                        </Grid>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div >
    )
}

export default ProjectsAndActivities