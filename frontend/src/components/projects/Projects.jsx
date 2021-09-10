import React, { useEffect, useState } from 'react'
import { Grid, CardContent, Typography, Card, Tabs, Tab, Drawer } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { setProjects } from '../../store/actions/projectActions';
import Chip from '@material-ui/core/Chip';


const Projects = () => {
    let { repos_url } = useSelector((state => state.userGitInfo.user));
    let userGitProjects = useSelector((state => state.githubProjects.projects));
    let { role } = useSelector((state => state.userInfo.user));

    const projects = [];
    userGitProjects.map((project) => {
        if (project.fork === false) {
            projects.push(project);
        }
        return null;
    });

    const dispatch = useDispatch();

    const [value, setValue] = useState(0);

    const handleChange = (e, value) => {
        setValue(value);
    }

    useEffect(() => {
        axios.get(repos_url).then((response) => {
            dispatch(setProjects(response.data));
        }).catch((error) => {
            console.log(error);
        })
    }, [repos_url, dispatch]);

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
                                                                <Chip  color='primary' label={project.language} />
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
                    </CardContent>
                </Card>
            </div>
        </div >
    )
}

export default Projects
