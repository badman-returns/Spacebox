import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction, AppBar, Avatar } from '@material-ui/core';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';
import BaseService from '../../services/base.service';
import { useSelector } from "react-redux";


const useStyles = makeStyles((theme) => ({
    root: {
        top: "auto",
        bottom: 0,
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
}));

export default function LabelBottomNavigation() {
    const classes = useStyles();
    const history = useHistory();
    const [value, setValue] = useState(0);

    let user = useSelector((state => state.userInfo.user));
    let { picURL, name, _id } = user;

    let firstName = name.split(' ')[0];


    const logout = () => {
        BaseService.logout();
        history.push('/');
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <AppBar position="fixed" color='primary' className={classes.root}>
            <BottomNavigation value={value} onChange={handleChange}>
                <BottomNavigationAction component={Link} to="/in/feed" label="Home" value="0" icon={<HomeIcon />} />
                <BottomNavigationAction component={Link} to="/in/jobs" label="Jobs" value="1" icon={<WorkIcon />} />
                <BottomNavigationAction component={Link} to={`/in/profile/${_id}`} label={firstName} value="2" icon={<Avatar className={classes.small} src={picURL} />} />
                <BottomNavigationAction label="Logout" value="3" icon={<PowerSettingsNewIcon />} onClick={logout} />
            </BottomNavigation>
        </AppBar>
    );
}