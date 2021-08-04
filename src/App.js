import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "components/Nav";
import Home from "pages/Home/Home";
import AdminRolePageView from "pages/Admin/AdminRolePageView";

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/admin/menu-role" exact component={AdminRolePageView} />
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
