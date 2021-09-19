import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import AddJobs from '../../components/add-job/AddJobs';
import JobList from '../../components/job-lists/JobList';
import JobDetails from '../../components/job-details/JobDetails';

function Job() {

    let loggedUser = useSelector((state => state.userInfo.user));

    const [refreshJobData, setRefreshJobData] = useState(false);

    const [jobListDeveloper, setJobListDeveloper] = useState(6);
    const [jobDetailsDeveloper, setJobDetailsDeveloper] = useState(1);

    const [addJobRecruiter, setAddJobRecruiter] = useState(5);
    const [jobListRecruiter, setJobListRecruiter] = useState(7);
    const [jobDetailsRecruiter, setJobDetailsRecruiter] = useState(1);

    const handleJobRefresh = () => {
        setRefreshJobData(true);
    }

    const handleRecruiterView = ()=> {
        setAddJobRecruiter(3);
        setJobListRecruiter(4);
        setJobDetailsRecruiter(5);
    }

    const handleDeveloperView = () => {
        setJobListDeveloper(5);
        setJobDetailsDeveloper(7);
    }

    const classes = useStyles();
    return (
        <Grid container className={classes.root} justifyContent='center' spacing={1}>
            {loggedUser.role === 'recruiter' &&
                (<>
                    <Grid item lg={addJobRecruiter}>
                        <AddJobs handleJobRefresh={handleJobRefresh} />
                    </Grid>
                    <Grid item lg={jobListRecruiter}>
                        <JobList refreshJobData={refreshJobData} allJobs={true} handleRecruiterView={handleRecruiterView}  />
                    </Grid>
                    <Grid item lg={jobDetailsRecruiter}>
                        <JobDetails />
                    </Grid>
                </>
                )
            }

            {loggedUser.role === 'developer' &&
                (
                    <>
                        <Grid item lg={jobListDeveloper}>
                            <JobList refreshJobData={refreshJobData} allJobs={true} handleDeveloperView={handleDeveloperView} />
                        </Grid>
                        <Grid item lg={jobDetailsDeveloper}>
                            <JobDetails />
                        </Grid>
                    </>
                )}
        </Grid>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        paddingTop: '75px',
        width: '100%',
        '& > * + *': {
            // marginTop: theme.spacing(2),
        },
    },
}));

export default Job
