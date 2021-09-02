import { HashRouter, Route, Switch, } from 'react-router-dom';
import Public from './routes/public';
import './App.css'
function EASY() {
  return (
    <HashRouter>
      <Switch>
        <Route path='/'>
          <Public />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default EASY;
