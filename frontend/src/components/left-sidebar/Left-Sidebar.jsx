import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import Paper from '@material-ui/core/Paper';

const LeftSidebar = () => {
    let userInfo = useSelector((state => state.userInfo));
    let userGitInfo = useSelector((state => state.userGitInfo));
    let { name, githubId } = userInfo.user;
    let { avatar_url, bio } = userGitInfo.user;

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper elevation={3} >
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={8}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Avatar src={avatar_url} className={classes.large} alt='profile_pic' />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <h3 className={classes.text}>{name}</h3>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <h5 className={classes.subtext}>{githubId}</h5>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <h5 className={classes.text}>{bio}</h5>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={2}></Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={8}>
                                <Grid container justifyContent='center'>
                                    <Grid item className={classes.menu} xs={12}>
                                        <Link className={classes.menusItems}>Profile</Link>
                                    </Grid>
                                    <Grid item className={classes.menu} xs={12}>
                                        <Link className={classes.menusItems}>Feed</Link>
                                    </Grid>
                                    <Grid item className={classes.menu} xs={12}>
                                        <Link className={classes.menusItems}>Activity</Link>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={2}></Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div >
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '20px 0px',
        height: '100vh',
        // backgroundColor: '#222433',
    },
    menu: {
        backgroundColor: '#2F3142',
        borderRadius: '15px',
        margin: '4px 0px',
        padding: '10px 10px'
    },
    menusItems: {
        fontSize: '23px',
        fontFamily: 'Ubuntu',
        color: '#DFE0E2',
        textDecoration: 'none'
    },
    text: {
        color: 'black',
        fontSize: '20px',
        fontFamily: 'Ubuntu',
        fontWeight: '200'
    },
    subtext: {
        fontFamily: 'Ubuntu',
        fontSize: '15px',
        fontWeight: '100',
        color: '#686D82'
    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },

}));

export default LeftSidebar;