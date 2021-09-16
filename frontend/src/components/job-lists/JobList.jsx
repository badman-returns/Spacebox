import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, CssBaseline, Typography, Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { GetJobs, GetJobById, GetJobByUserId, DeleteJob } from '../../services/job.service'
import { setJobs, setCurrentJobs, setUserJobs } from '../../store/actions/jobAction';
import { useSelector, useDispatch } from "react-redux";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteDialog from '../delete-dialog/DeleteDialog';
import { toast } from 'react-toastify';
import Backdrop from '@material-ui/core/Backdrop';
import moment from 'moment';
import EditJob from '../edit-job/EditJob';

const JobList = ({ allJobs, refreshJobData, profile }) => {

    let jobs = useSelector((state => state.jobs.jobs));
    let userJobs = useSelector((state => state.userJobs.jobs));
    let { _id } = useSelector((state => state.profileInfo.user));
    let loggedUser = useSelector((state => state.userInfo.user));
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [open, setOpen] = useState(false);
    const [currentJobId, setCurrentJobId] = useState('');
    const [currentJobData, setCurrentJobData] = useState('');

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    const handleDelete = (jobId) => {
        setOpenConfirmationDialog(true);
        setCurrentJobId(jobId);
    }

    const handleEdit = (job) => {
        setOpenEditDialog(true);
        setCurrentJobData(job);
    }

    const toasterSuccess = (message) => {
        toast.success(message);
    }

    const toasterFailure = (message) => {
        toast.error(message);
    }

    const confirmDeleteJob = async () => {
        setOpenConfirmationDialog(false);
        handleToggle();
        try {
            const response = await DeleteJob(loggedUser._id, currentJobId);
            if (response.status === 200) {
                toast.success(response.data.ResponseMessage);
                GetJobsByUserId();
            }
            handleClose();
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    }

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

    const GetJobsByUserId = async () => {
        try {
            const response = await GetJobByUserId(_id);
            if (response.status === 200) {
                dispatch(setUserJobs(response.data.ResponseData));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const initialRendering = () => {
        if (allJobs !== true) {
            GetJobsByUserId();
        }
        else {
            GetAllJobs();
        }
    }

    const handleCurrentJob = (id) => {
        GetCurrentJob(id);
    }

    useEffect(() => {
        initialRendering();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshJobData, allJobs]);

    const classes = useStyles();
    return (
        <Grid container justifyContent='flex-start' alignItems='center' >
            <CssBaseline />
            {allJobs === true && (<Card style={{ height: '92vh', overflow: 'auto' }}>
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
                                                <Typography variant='subtitle1'>
                                                    {job.location}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item lg={12}>
                                            <Grid container justifyContent='space-between'>
                                                <Grid item>
                                                    <Typography variant='body1'>
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
            </Card>)}
            {userJobs && userJobs.length > 0 && allJobs === false &&
                (<Card style={{ height: '92vh', overflow: 'auto' }}>
                    <CardContent>
                        <Grid container spacing={1}>
                            {userJobs.map((job) =>
                            (<Grid item lg={12} key={job._id}>
                                <Card>
                                    <CardContent>
                                        <Grid container>
                                            <Grid item lg={12}>
                                                {loggedUser._id === _id && (<Grid container justifyContent='flex-end' spacing={2}>
                                                    <Grid item>
                                                        <CreateIcon className={classes.icon} onClick={() => handleEdit(job)} />
                                                    </Grid>
                                                    <Grid item>
                                                        <DeleteIcon className={classes.icon} onClick={() => handleDelete(job._id)} />
                                                    </Grid>
                                                </Grid>)}
                                                <Grid container>
                                                    <Grid item lg={6}>
                                                        <Grid container justifyContent='flex-start'>
                                                            <Typography variant='h6'>
                                                                {job.title}
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
                                                    <Typography variant='subtitle1'>
                                                        {job.location}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid item lg={12}>
                                                <Grid container justifyContent='space-between'>
                                                    <Grid item>
                                                        <Typography variant='body1'>
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
                </Card>)}
            <DeleteDialog
                SetOpen={openConfirmationDialog}
                handleClose={() => setOpenConfirmationDialog(false)}
                title="Delete Job"
                content="Are you sure want to delete this job"
                handleConfirm={confirmDeleteJob}
                confirmButtonColorSecondary={false}
            />
            {currentJobData !== null && currentJobData !== undefined && currentJobData !== '' && (<EditJob
                SetOpen={openEditDialog}
                handleClose={() => setOpenEditDialog(false)}
                data={currentJobData}
                toasterSuccess={toasterSuccess}
                toasterFailure={toasterFailure}
                title="Edit Job"
                confirmButtonColorSecondary={false}
            />)}
            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>

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
    icon: {
        cursor: 'pointer',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default JobList;
