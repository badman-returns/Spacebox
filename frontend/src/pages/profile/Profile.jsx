import Grid from '@material-ui/core/Grid'
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUserGithubInfo } from '../../store/actions/userActions';
import axios from 'axios';
import Profile from '../../components/profile/Profile';
import Projects from '../../components/projects/Projects';

const ProfilePage = () => {
    let userInfo = useSelector((state => state.userInfo));
    let { githubId } = userInfo.user;

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_GITHUB_API_URL}/users/${githubId}`).then((response) => {
            dispatch(setUserGithubInfo(response.data));
        }).catch((error) => {
            console.log(error);
        })

    }, [dispatch, githubId])

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={1}  className={classes.panel}>
                </Grid>
                <Grid item xs={10} className={classes.feed}>
                    <Grid container-fluid justifyContent="center" alignItems="center">
                        <Grid item className={classes.item}><Profile /></Grid>
                        <Grid item className={classes.item}><Projects /></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={1} className={classes.feed}>
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
    item:{
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