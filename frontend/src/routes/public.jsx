import { Route, Switch, } from 'react-router-dom';
import SignUp from '../pages/home/signup/SignUp';

function Public() {
    return (
        <Switch>
            <Route path='/'>
                <SignUp />
            </Route>
        </Switch>
    );
}

export default Public;
