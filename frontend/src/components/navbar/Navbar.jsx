import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Avatar, Typography, Toolbar, AppBar, Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    text: {
        margin: '5px 0',
        color: '#707070',
        textDecoration: 'none'
    },
    appbar: {
        height: '60px',
    }
}));

export default function Navbar() {
    const classes = useStyles();

    const [clickAvatar, setClickAvatar] = useState(null);

    const handleClick = (event) => {
        setClickAvatar(event.currentTarget);
    };

    const handleClose = () => {
        setClickAvatar(null);
    };

    let userGitInfo = useSelector((state => state.userGitInfo));
    let { avatar_url } = userGitInfo.user;

    return (
        <div className={classes.root}>
            <AppBar position='fixed' className={classes.appbar} color='inherit'>
                <Toolbar>
                    <Grid container justifyContent='space-around'>
                        <Grid item >
                            <Grid container alignItems='center' justifyContent='flex-start'>
                                <img src={process.env.PUBLIC_URL + 'logo.png'} alt='logo' />
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <Grid container justifyContent="space-evenly" alignItems="center">
                                <Grid item >
                                    <Typography>
                                        <Link to='/feed' className={classes.text}>
                                            Home
                                        </Link>
                                    </Typography>
                                </Grid>
                                <Grid item >
                                    <Typography className={classes.text}>
                                        Jobs
                                    </Typography>
                                </Grid>
                                <Grid item className={classes.text}>
                                    <Avatar src={avatar_url} onClick={handleClick}></Avatar>
                                    <Menu
                                        id="menu"
                                        anchorEl={clickAvatar}
                                        keepMounted
                                        open={Boolean(clickAvatar)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleClose}><Link className={classes.text} to='/profile'>Profile</Link></MenuItem>
                                        <MenuItem onClick={handleClose}>My account</MenuItem>
                                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                                    </Menu>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}
