import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, CssBaseline, Typography, Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { GetJobs, GetJobById } from '../../services/job.service'
import { setJobs, setCurrentJobs } from '../../store/actions/jobAction';
import { useSelector, useDispatch } from "react-redux";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import moment from 'moment';

const JobList = ({ refreshJobData }) => {

    let jobs = useSelector((state => state.jobs.jobs));

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const GetAllJobs = async () => {
        setLoading(true);
        try {
            const response = await GetJobs();
            if (response.status === 200) {
                dispatch(setJobs(response.data.ResponseData));
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const GetCurrentJob = async (id) => {
        try {
            const response = await GetJobById(id);
            if (response.status === 200) {
                dispatch(setCurrentJobs(response.data.ResponseData));
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleCurrentJob = (id) => {
        GetCurrentJob(id);
    }

    useEffect(() => {
        GetAllJobs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshJobData]);

    const classes = useStyles();
    return (
        <Grid container justifyContent='flex-start' alignItems='center' >
            <CssBaseline />
            <Card style={{ height: '92vh', overflow: 'auto' }}>
                <CardContent>
                    <Grid container spacing={1}>
                        {jobs && jobs.length && jobs.map((job) =>
                        (<Grid item lg={12} key={job._id}>
                            <Card>
                                <CardContent>
                                    <Grid container>
                                        <Grid item lg={12}>
                                            <Grid container>
                                                <Grid item lg={6}>
                                                    <Grid container justifyContent='flex-start'>
                                                        <Typography variant='h6'>
                                                            {job.title}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid item lg={6}>
                                                    <Grid container justifyContent='flex-end'>
                                                        <Typography variant='h6'>
                                                            <Button onClick={() => handleCurrentJob(job._id)}>
                                                                <ArrowForwardIcon />
                                                            </Button>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item lg={12}>
                                            <Grid container justifyContent='flex-start'>
                                                <Typography variant='subtitle1'>
                                                    {job.company}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item lg={12}>
                                            <Grid container justifyContent='flex-start'>
                                                <Typography variant='subtitle'>
                                                    {job.location}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item lg={12}>
                                            <Grid container justifyContent='space-between'>
                                                <Grid item>
                                                    <Typography variant='body'>
                                                        Posted by <b>{job.createdBy.name}</b>
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    Posted on <b>{moment(job.createdOn).format('DD-MM-YYYY')}</b>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        ))}
                        {loading && (
                            <Grid container justifyContent='center' alignItems='center' className={classes.root}>
                                <CircularProgress />
                            </Grid>
                        )}
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

export default JobList;
