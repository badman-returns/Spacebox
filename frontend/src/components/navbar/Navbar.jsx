import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Avatar, Typography, Toolbar, AppBar } from '@material-ui/core';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import BaseService from '../../services/base.service';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    text: {
        margin: '5px 5px',
        color: '#707070',
        textDecoration: 'none',
        cursor: 'pointer'
    },
    appbar: {
        height: '60px',
    }
}));

export default function Navbar() {

    let user = useSelector((state => state.userInfo.user));
    let { picURL, name } = user;

    let firstName = name.split(' ')[0];

    const history = useHistory();

    const logout = () => {
        BaseService.logout();
        history.push('/');
    }

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position='fixed' className={classes.appbar} color='inherit'>
                <Toolbar>
                    <Grid container justifyContent='space-between'>
                        <Grid item >
                            <Grid container alignItems='center' justifyContent='flex-start'>
                                <img src={process.env.PUBLIC_URL + 'logo.png'} alt='logo' />
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <Grid container justifyContent="space-evenly" alignItems="center">
                                <Grid item >
                                    <Typography>
                                        <NavLink to='/in/feed' className={classes.text}>
                                            Home
                                        </NavLink>
                                    </Typography>
                                </Grid>
                                <Grid item >
                                    <Typography className={classes.text}>
                                    <NavLink to='/in/jobs' className={classes.text}>
                                            Jobs
                                        </NavLink>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <NavLink to='/in/profile' className={classes.text}>
                                        <Typography className={classes.text}>{firstName}</Typography>
                                    </NavLink>
                                </Grid>
                                <Grid item >
                                        <PowerSettingsNewIcon onClick={logout} className={classes.text} />
                                </Grid>
                                <Grid item className={classes.text}>
                                    <Avatar src={picURL}></Avatar>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}
