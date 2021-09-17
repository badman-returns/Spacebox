import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ProtectedRouter from './routes/router';
import RegisterLoginPage from './pages/home/RegisterLoginPage';
import Navbar from './components/navbar/Navbar';
import ScrollToTop from './utility/scroll-to-top';
import VerifyEmail from './pages/home/VerifyEmail';
import BottomNav from './components/bottom-navigation/BottomNav';
import { makeStyles } from '@material-ui/core';
import ForgetPassword from './pages/forget-password/ForgetPassword';
import ResetPassword from './pages/forget-password/ResetPassword';

const useStyles = makeStyles((theme) => ({
  bottomNav: {
    '@media (min-width: 1280px)': {
      display: 'none',
    }
  },
  root: {
    backgroundColor: '#fff',
    height: '100vh'
  }
}))

const App = () => {
  const classes = useStyles();
  return (
    <HashRouter>
      <Switch>

        <Route path='/in'>
          <Navbar />
          <ScrollToTop />
          <ProtectedRouter />
          <div className={classes.bottomNav} >
            <BottomNav />
          </div>
        </Route>

        <Route exact path='/verify-email/:userId/:token'>
          <VerifyEmail />
        </Route>

        <Route exact path='/forget-password'>
          <div className={classes.root}>
            <ForgetPassword />
          </div>
        </Route>

        <Route exact path='/password-reset/:userId/:token'>
          <div className={classes.root}>
            <ResetPassword />
          </div>
        </Route>

        <Route path='/'>
          <div className={classes.root}>
            <RegisterLoginPage />
          </div>
        </Route>

      </Switch>
    </HashRouter>
  )
}

export default App;