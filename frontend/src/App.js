import { Route, Switch, } from 'react-router-dom';
import RegisterLoginPage from './pages/home/RegisterLoginPage';
// import Users from './routes/user';
import Feed from './pages/feed/Feed';
import ProfilePage from './pages/profile/Profile';
import Protector from './utility/protector';

import './App.css'
import Navbar from './components/navbar/Navbar';

const App = () => {
  return (
    <Switch>
      <Protector path='/feed'>
        <Navbar />
        <Feed />
      </Protector>

      <Protector path='/profile'>
        <Navbar />
        <ProfilePage/>
      </Protector>

      <Route path='/'>
        <RegisterLoginPage />
      </Route>

    </Switch>
  );
}

export default App;
