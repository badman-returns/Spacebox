import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Avatar, Typography, Toolbar, AppBar } from '@material-ui/core';
import { NavLink, useHistory, Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import BaseService from '../../services/base.service';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';

const useStyles = makeStyles((theme) => ({
    text: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#707070',
        textDecoration: 'none',
        cursor: 'pointer',
        fontStyle: 'san-serif',
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    navLinks: {
        fontSize: '13px',
    },
    logoContainer: {
        '@media (max-width: 1280px)': {
            justifyContent: 'center'
        }
    },
    menu: {
        '@media (max-width: 1280px)': {
            display: 'none'
        }
    }
}));

export default function Navbar() {

    let user = useSelector((state => state.userInfo.user));
    let { picURL, name, _id } = user;


    let firstName = name.split(' ')[0];

    const history = useHistory();

    const logout = () => {
        BaseService.logout();
        history.push('/');
    }

    const classes = useStyles();
    return (
        <AppBar position='fixed' color='inherit'>
            <Toolbar>
                <Grid container className={classes.logoContainer} justifyContent='space-around' alignItems='center'>
                    <Grid item>
                        <Grid container alignItems='center' justifyContent='center'>
                            <Grid item>
                                <Link className={classes.linkText} to={`/in/feed`}>
                                    <img src={process.env.PUBLIC_URL + 'navlogo.png'} alt='logo' />
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} className={classes.menu}>
                        <Grid container justifyContent="space-evenly" alignItems="center">
                            <Grid item >
                                <Typography>
                                    <NavLink to='/in/feed' className={classes.text}>
                                        <HomeIcon />
                                        <p className={classes.navLinks}>Home</p>
                                    </NavLink>
                                </Typography>
                            </Grid>
                            <Grid item >
                                <Typography>
                                    <NavLink to='/in/jobs' className={classes.text}>
                                        <WorkIcon />
                                        <p className={classes.navLinks}>Jobs</p>
                                    </NavLink>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    <NavLink to={`/in/profile/${_id}`} className={classes.text}>
                                        <Avatar className={classes.small} src={picURL}></Avatar>
                                        <p className={classes.navLinks}>{firstName}</p>
                                    </NavLink>
                                </Typography>
                            </Grid>
                            <Grid item >
                                <Typography className={classes.text} onClick={logout}>
                                    <PowerSettingsNewIcon />
                                    <p className={classes.navLinks}>Logout</p>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}
