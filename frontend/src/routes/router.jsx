import { Switch } from 'react-router-dom';
import Feed from '../pages/feed/Feed';
import Job from '../pages/job/Job';
import ProfilePage from '../pages/profile/ProfilePage';
import Protector from '../utility/protector';


const ProtectedRouter = () => {
    return (
        <Switch>
            <Protector path='/in/feed'><Feed /></Protector>
            <Protector path='/in/profile/:id'><ProfilePage /></Protector>
            <Protector path='/in/job'><Job /></Protector>
        </Switch>
    )
}

export default ProtectedRouter;