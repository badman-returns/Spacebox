import { Route, Switch, } from 'react-router-dom';
import RegisterLoginPage from '../pages/home/RegisterLoginPage';

function Public() {
    return (
        <Switch>
            <Route path='/'>
                <RegisterLoginPage />
            </Route>
        </Switch>
    );
}

export default Public;
