import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ProtectedRouter from './routes/router';
import RegisterLoginPage from './pages/home/RegisterLoginPage';
import Navbar from './components/navbar/Navbar';
import ScrollToTop from './utility/scroll-to-top';

const App = () => {
  return (
    <HashRouter>
      <Switch>

        <Route path='/in'>
          <Navbar />
          <ScrollToTop />
          <ProtectedRouter />
        </Route>

        <Route path='/'>
          <RegisterLoginPage />
        </Route>

      </Switch>
    </HashRouter>
  )
}

export default App;