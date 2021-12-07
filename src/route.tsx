import {
  BrowserRouter, Route, Switch
} from "react-router-dom";
import App from './App';
import Offline from './offline';
import Online from './online';
// import your route components too

export const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/online" exact component={Online} />
      <Route path="/offline" exact component={Offline} />
    </Switch>
  </BrowserRouter>
)