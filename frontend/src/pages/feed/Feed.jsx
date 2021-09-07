import Grid from '@material-ui/core/Grid'
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LeftSidebar from '../../components/left-sidebar/Left-Sidebar';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUserGithubInfo } from '../../store/actions/userActions';
import axios from 'axios';
import Post from '../../components/posts/Post';

const Feed = () => {
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
                <Grid item xs={3} sm={3} md={4} lg={4} className={classes.panel}>
                    {/* <LeftSidebar /> */}
                </Grid>
                <Grid item xs={6} sm={6} md={4} lg={4} className={classes.feed}>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item><Post /></Grid>
                        <Grid item><Post /></Grid>
                        <Grid item><Post /></Grid>
                        <Grid item><Post /></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3} sm={3} md={4} lg={4} className={classes.feed}>
                    {/* <h1>Activity</h1> */}
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

export default Feed;