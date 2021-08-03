import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "components/Nav";
import Home from "pages/Home/Home";
import GlobalStyles from "styles/GlobalStyles";

function App() {
  return (
    <Router>
      <Nav />
      <GlobalStyles />
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
