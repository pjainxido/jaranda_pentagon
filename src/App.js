import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { PublicRoute, PrivateRoute } from 'components/Route';
import Nav from 'components/Nav';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import Admin from 'pages/Admin';
import AdminRolePageView from 'pages/Admin/AdminRolePageView';
import { Parent } from 'pages/Parent';
import { Teacher } from 'pages/Teacher';

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <PublicRoute path='/' component={Login} restricted exact />
        <PublicRoute path='/signup' component={SignUp} restricted />
        <PrivateRoute path='/admin' component={Admin} exact />
        <PrivateRoute path='/admin/manage_role' component={AdminRolePageView} exact />
        <PrivateRoute path='/parent' component={Parent} />
        <PrivateRoute path='/teacher' component={Teacher} />
      </Switch>
    </Router>
  );
}

export default App;
