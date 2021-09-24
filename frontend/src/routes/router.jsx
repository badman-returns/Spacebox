import React from 'react';
import { Switch } from 'react-router-dom';
import Protector from '../utility/protector';
const Feed = React.lazy(() => import('../pages/feed/Feed'));
const Job = React.lazy(() => import('../pages/job/Job'));
const ProfilePage = React.lazy(() => import('../pages/profile/ProfilePage'));

const ProtectedRouter = () => {
    return (
        <Switch>

            <Protector path='/in/feed'>
                <Feed />
            </Protector>
            <Protector path='/in/profile/:id'>
                <ProfilePage />
            </Protector>
            <Protector path='/in/jobs'>
                <Job />
            </Protector>
        </Switch>
    )
}

export default ProtectedRouter;