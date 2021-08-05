import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Nav } from "components/Nav";
import { Teachers, Parent } from "pages/Parent";
import Admin from "pages/Admin";
import SignUp from "pages/SignUp";
import Login from "pages/Login";

import { PublicRoute, PrivateRoute } from "components/Route";

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <PublicRoute path='/' component={Login} restricted exact />
        <PublicRoute path='/signup' component={SignUp} restricted />
        <PrivateRoute path='/admin' component={Admin} />
        <PrivateRoute
          path='/admin/manage_role'
          exact
          component={AdminRolePageView}
        />
        <PrivateRoute path='/parent' component={Parent} />
        <PrivateRoute path='/teacher' component={Teachers} />
      </Switch>
    </Router>
  );
}

export default App;
