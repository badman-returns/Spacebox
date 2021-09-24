import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Avatar, Typography, Toolbar, AppBar } from '@material-ui/core';
import { NavLink, useHistory, Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import BaseService from '../../services/base.service';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';
import AlertDialog from '../alert-dialog/AlertDialog';

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

    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

    let firstName = name.split(' ')[0];

    const history = useHistory();

    const handleLogout = () => {
        setOpenConfirmationDialog(true);
    }

    const logout = () => {
        BaseService.logout();
        history.push('/');
    }

    const classes = useStyles();
    return (
        <AppBar position='fixed' color='inherit' elevation={0} style={{borderBottom: '1px solid #D8D8D8'}}>
            <Toolbar>
                <Grid container className={classes.logoContainer} justifyContent='space-around' alignItems='center'>
                    <Grid item>
                        <Grid container alignItems='center' justifyContent='center'>
                            <Grid item>
                                <Link to={`/in/feed`}>
                                    <img src={process.env.PUBLIC_URL + 'navlogo.png'} alt='logo' />
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} className={classes.menu}>
                        <Grid container justifyContent="space-evenly" alignItems="center">
                            <Grid item >
                                <NavLink to='/in/feed' className={classes.text}>
                                    <HomeIcon />
                                    <Typography className={classes.navLinks}>Home</Typography>
                                </NavLink>
                            </Grid>
                            <Grid item >
                                <NavLink to='/in/jobs' className={classes.text}>
                                    <WorkIcon />
                                    <Typography className={classes.navLinks}>Jobs</Typography>
                                </NavLink>
                            </Grid>
                            <Grid item>
                                <NavLink to={`/in/profile/${_id}`} className={classes.text}>
                                    <Avatar className={classes.small} src={picURL}></Avatar>
                                    <Typography className={classes.navLinks}>{firstName}</Typography>
                                </NavLink>
                            </Grid>
                            <Grid item className={classes.text} onClick={handleLogout}>
                                {/* <Typography > */}
                                <PowerSettingsNewIcon />
                                <Typography className={classes.navLinks}>Logout</Typography>
                                {/* </Typography> */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <AlertDialog
                    SetOpen={openConfirmationDialog}
                    handleClose={() => setOpenConfirmationDialog(false)}
                    title="Logout"
                    content="Are you sure want to logout?"
                    handleConfirm={logout}
                    confirmButtonColorSecondary={true}
                />
            </Toolbar>
        </AppBar>
    );
}
