import React from 'react';
import { Switch } from 'react-router-dom';
import Protector from '../utility/protector';
import { makeStyles } from '@material-ui/core';
const Feed = React.lazy(() => import('../pages/feed/Feed'));
const Job = React.lazy(() => import('../pages/job/Job'));
const ProfilePage = React.lazy(() => import('../pages/profile/ProfilePage'));

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: '#FAFAFA',
      height: '100vh'
    },
  }))

const ProtectedRouter = () => {
    const classes = useStyles();
    return (
        <Switch>
            <div className={classes.root}>
                <Protector path='/in/feed'>
                    <Feed />
                </Protector>
                <Protector path='/in/profile/:id'>
                    <ProfilePage />
                </Protector>
                <Protector path='/in/jobs'>
                    <Job />
                </Protector>
            </div>
        </Switch>
    )
}

export default ProtectedRouter;