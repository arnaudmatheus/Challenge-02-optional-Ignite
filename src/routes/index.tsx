import { Switch, Route } from "react-router-dom";
import { DashboardTS } from "../pages/Dashboard";

const Routes = () => (
  <Switch>
    <Route path="/" exact component={DashboardTS} />
  </Switch>
);

export default Routes;
