import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "components/Nav";
import Home from "pages/Home/Home";
import GlobalStyles from "styles/GlobalStyles";

import Admin from "pages/Admin";

function App() {
  return (
    <Router>
      <Nav />
      <GlobalStyles />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/admin" component={Admin} />
      </Switch>
    </Router>
  );
}

export default App;
