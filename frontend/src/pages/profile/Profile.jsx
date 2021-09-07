import Grid from '@material-ui/core/Grid'
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUserGithubInfo } from '../../store/actions/userActions';
import axios from 'axios';
import Profile from '../../components/profile/Profile';

const ProfilePage = () => {
    let userInfo = useSelector((state => state.userInfo));
    let { githubId } = userInfo.user;

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_GITHUB_API_URL}/users/${githubId}`).then((response) => {
            dispatch(setUserGithubInfo(response.data));
        })

    }, [dispatch, githubId])

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={2} sm={2} md={3} lg={3} className={classes.panel}>
                </Grid>
                <Grid item xs={8} sm={8} md={6} lg={6} className={classes.feed}>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item><Profile /></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={2} sm={2} md={3} lg={3} className={classes.feed}>
                </Grid>
            </Grid>

        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        marginTop: '80px',
    },
    panel: {
        // borderRight: '1px solid black',
        height: '100vh'
    },
    activity: {
        height: '100vh'
    },
    feed: {
        // borderRight: '1px solid black',
        height: '100vh'
    }
}));

export default ProfilePage;