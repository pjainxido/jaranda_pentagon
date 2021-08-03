import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "pages/Home/Home";
import GlobalStyles from "styles/GlobalStyles";
import Admin from "pages/Admin/Admin"

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route path="/" exact component={Admin} />
      </Switch>
    </Router>
  );
}

export default App;
