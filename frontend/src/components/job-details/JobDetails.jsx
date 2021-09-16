import React from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Card, CardContent, Grid, Typography, Divider, CssBaseline, Avatar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { htmlParser } from '../../utility/html-parser';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const JobDetails = () => {


    const selectedJob = useSelector(state => state.currentJob.job);
    console.log(selectedJob);
    let currentJob;
    if (selectedJob !== undefined && selectedJob !== null) {
        currentJob = selectedJob[0];
    }


    const classes = useStyles();

    return (
        <div>
            <CssBaseline />
            {currentJob !== null && currentJob !== undefined && (<Card style={{ height: '92vh', overflow: 'auto' }}>
                <CardContent>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Grid container justifyContent='flex-start'>
                                <Grid item lg={12}>
                                    <Grid container justifyContent='flex-start'>
                                        <Grid item lg={12}>
                                            <Typography variant='h5'>{currentJob.title}</Typography>
                                        </Grid>
                                        <Grid item lg={12}>
                                            <Typography variant='subtitle1'>{currentJob.company}</Typography>
                                        </Grid>
                                        <Grid item lg={12}>
                                            <Typography variant='subtitle2'>{currentJob.location}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container justifyContent='space-between'>
                                        <Grid item >
                                            <Typography variant='body'>
                                                Posted By  &nbsp;
                                                <Grid container alignItems='center' spacing={1}>
                                                    <Grid item>
                                                        <Link className={classes.user} to={`/in/profile/${currentJob.createdBy._id}`}>
                                                            <Avatar src={currentJob.createdBy.picURL ? currentJob.createdBy.picURL : ''} />
                                                        </Link>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="body" component="h3">
                                                            <Link className={classes.user} to={`/in/profile/${currentJob.createdBy._id}`}>{currentJob.createdBy.name}</Link>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <b>{moment(currentJob.createdOn).format('DD-MM-YYYY')}</b>
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
                                        <Grid container justifyContent='center'>
                                            <Typography variant='body2'>
                                                {htmlParser(currentJob.description)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid >
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>)}
            {!currentJob && (
                <Grid container justifyContent='center' alignItems='center'>
                    <Typography variant='h5'>Select Job <ArrowForwardIcon /> to view Job Description</Typography>
                </Grid>
            )}
        </div>
    )
}


const useStyles = makeStyles((theme) => ({
    user: {
        textDecoration: 'none',
        color: '#000'
    }
}));

export default JobDetails
