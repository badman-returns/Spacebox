import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Card, CardContent, Grid, Typography, Divider, CssBaseline, Avatar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { htmlParser } from '../../utility/html-parser';
import { makeStyles } from '@material-ui/core/styles';
import { setCurrentJobs } from '../../store/actions/jobAction';

const JobDetails = () => {


    let selectedJob = useSelector(state => state.currentJob.job);
    let previousJob = useRef();

    const dispatch = useDispatch();

    let currentJob;
    if (selectedJob !== undefined && selectedJob !== null) {
        currentJob = selectedJob[0];
    }

    const classes = useStyles();

    useEffect(() => {
        previousJob.current = currentJob;
        return () => {
            dispatch(setCurrentJobs(null));
        }
    }, [currentJob, dispatch]);

    return (
        <>
            <CssBaseline />
            {previousJob.current && (<Card style={{ height: '92vh', overflow: 'auto' }}>
                <CardContent>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Grid container justifyContent='flex-start'>
                                <Grid item lg={12}>
                                    <Grid container justifyContent='flex-start'>
                                        <Grid item lg={12}>
                                            <Typography variant='h5'>{previousJob.current.title}</Typography>
                                        </Grid>
                                        <Grid item lg={12}>
                                            <Typography variant='subtitle1'>{previousJob.current.company}</Typography>
                                        </Grid>
                                        <Grid item lg={12}>
                                            <Typography variant='subtitle2'>{previousJob.current.location}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container justifyContent='space-between'>
                                        <Grid item >
                                            Posted By  &nbsp;
                                            <Grid container alignItems='center' spacing={1}>
                                                <Grid item>
                                                    <Link className={classes.user} to={`/in/profile/${previousJob.current.createdBy._id}`}>
                                                        <Avatar src={previousJob.current.createdBy.picURL ? previousJob.current.createdBy.picURL : ''} />
                                                    </Link>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="body1">
                                                        <Link className={classes.user} to={`/in/profile/${previousJob.current.createdBy._id}`}>{previousJob.current.createdBy.name}</Link>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <b>{moment(previousJob.current.createdOn).format('DD-MM-YYYY')}</b>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={4}>
                                <Grid item lg={12}>
                                    <Divider />
                                    <Grid container justifyContent='center'>
                                        <Typography variant='h6'>
                                            Job Desciption
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid container justifyContent='center'>
                                    <Grid item lg={10}>
                                        <Typography variant='body2'>
                                            {htmlParser(previousJob.current.description)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid >
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>)}
        </>
    )
}


const useStyles = makeStyles((theme) => ({
    user: {
        textDecoration: 'none',
        color: '#000'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default JobDetails
