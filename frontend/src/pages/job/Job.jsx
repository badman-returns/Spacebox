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

    const handleJobRefresh = () => {
        setRefreshJobData(true);
    }

    const classes = useStyles();
    return (
        <Grid container className={classes.root} spacing={1}>
            {loggedUser.role === 'recruiter' &&
                (<>
                    <Grid item lg={3}>
                        <AddJobs handleJobRefresh={handleJobRefresh} />
                    </Grid>
                    <Grid item lg={4}>
                        <JobList refreshJobData={refreshJobData} />
                    </Grid>
                    <Grid item lg={5}>
                        <JobDetails />
                    </Grid>
                </>
                )
            }

            {loggedUser.role === 'developer' &&
                (
                    <>
                        <Grid item lg={5}>
                            <JobList refreshJobData={refreshJobData} />
                        </Grid>
                        <Grid item lg={7}>
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
