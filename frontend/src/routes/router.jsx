import { Switch } from 'react-router-dom';
import Feed from '../pages/feed/Feed';
import Job from '../pages/job/Job';
import Profile from '../pages/profile/Profile';
import Protector from '../utility/protector';


const ProtectedRouter = () => {
    return (
        <Switch>
            <Protector path='/in/feed'><Feed /></Protector>
            <Protector path='/in/profile'><Profile /></Protector>
            <Protector path='/in/job'><Job /></Protector>
        </Switch>
    )
}

export default ProtectedRouter;