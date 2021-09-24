import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ScrollToTop from './utility/scroll-to-top';
import VerifyEmail from './pages/home/VerifyEmail';
import { makeStyles } from '@material-ui/core';
import ForgetPassword from './pages/forget-password/ForgetPassword';
import ResetPassword from './pages/forget-password/ResetPassword';
const BottomNav = React.lazy(() => import('./components/bottom-navigation/BottomNav'));
const ProtectedRouter = React.lazy(() => import('./routes/router'));
const RegisterLoginPage = React.lazy(() => import('./pages/home/RegisterLoginPage'));
const Navbar = React.lazy(() => import('./components/navbar/Navbar'));

const useStyles = makeStyles((theme) => ({
  bottomNav: {
    '@media (min-width: 1280px)': {
      display: 'none',
    }
  },
  root: {
    backgroundColor: '#fff',
    height: '100vh'
  },
}))

const App = () => {
  const classes = useStyles();
  return (
    <HashRouter>
      <Switch>
        <Route path='/in'>
          <section>
            <Navbar />
            <ScrollToTop />
            <ProtectedRouter />
            <div className={classes.bottomNav} >
              <BottomNav />
            </div>
          </section>
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
          <section>
            <div className={classes.root}>
              <RegisterLoginPage />
            </div>
          </section>
        </Route>

      </Switch>
    </HashRouter >
  )
}

export default App;