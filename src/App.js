import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { PublicRoute, PrivateRoute } from "components/Route";
import Nav from "components/Nav";
import Login from "pages/Login";
import SignUp from "pages/SignUp";
import Admin from "pages/Admin";
import AdminRolePageView from "pages/Admin";
import { Teachers, Parent } from "pages/Parent";

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <PublicRoute path="/" component={Login} restricted exact />
        <PublicRoute path="/signup" component={SignUp} restricted />
        <PrivateRoute path="/admin" component={Admin} />
        <PrivateRoute
          path="/admin/manage_role"
          exact
          component={AdminRolePageView}
        />
        <PrivateRoute path="/parent" component={Parent} />
        <PrivateRoute path="/teacher" component={Teachers} />
      </Switch>
    </Router>
  );
}

export default App;
