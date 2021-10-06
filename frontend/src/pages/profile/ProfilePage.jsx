import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, CssBaseline } from '@material-ui/core'
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from "react-redux";
import { setUserProfile } from '../../store/actions/userActions';
import Profile from '../../components/profile/Profile';
import ProjectsAndActivities from '../../components/project-activity/ProjectsAndActivities';
import { GetProfileService } from '../../services/profile.service';
import { Container } from '@material-ui/core';

const ProfilePage = () => {
    const location = useLocation();
    const userId = location.pathname.split('/').reverse()[0];
    const [done, setIsDone] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();

    const GetProfileById = async () => {
        try {
            const response = await GetProfileService(userId);
            if (response.status === 200) {
                dispatch(setUserProfile(response.data.ResponseData));
                setIsDone(true);
            }
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        GetProfileById();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    return (
        <Grid className={classes.root}>
            <CssBaseline />
            <Grid container>
                <Grid item xs={1} className={classes.panel}>
                </Grid>
                <Grid item xs={10} className={classes.feed}>
                    <Grid container justifyContent="center" alignItems="center">
                        {done && (
                            <Grid container>
                                <Container>
                                    <Grid item className={classes.item}><Profile /></Grid>
                                    <Grid item className={classes.item}><ProjectsAndActivities /></Grid>
                                </Container>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
                <Grid item xs={1} className={classes.feed}>
                </Grid>
            </Grid>

        </Grid>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        paddingTop: '60px',
    },
    item: {
        marginTop: '20px',
    },
    panel: {
        height: '100vh'
    },
    activity: {
        height: '100vh'
    },
    feed: {
        height: '100vh'
    }
}));

export default ProfilePage;