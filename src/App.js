import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { PublicRoute, PrivateRoute } from 'routes';
import Nav from 'components/Nav/Nav';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import Admin from 'pages/Admin';
import AdminRolePageView from 'pages/Admin/AdminRolePageView';
import { Parent } from 'pages/Parent';
import { Teacher } from 'pages/Teacher';
import NotFound from 'pages/NotFound';
import ROUTE_PATH from 'constants/routePath';

const App = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <PublicRoute path={ROUTE_PATH.MAIN} component={Login} restricted exact />
        <PublicRoute path={ROUTE_PATH.SIGN_UP} component={SignUp} restricted />
        <PrivateRoute path={ROUTE_PATH.ADMIN} component={Admin} exact />
        <PrivateRoute path={ROUTE_PATH.MANAGE_ROLE} component={AdminRolePageView} exact />
        <PrivateRoute path={ROUTE_PATH.PARENT} component={Parent} />
        <PrivateRoute path={ROUTE_PATH.TEACHER} component={Teacher} />
        <NotFound />
      </Switch>
    </Router>
  );
};

export default App;
