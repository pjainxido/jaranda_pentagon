import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "pages/Home/Home";
import GlobalStyles from "styles/GlobalStyles";
<<<<<<< HEAD
import Admin from "pages/Admin";
=======
>>>>>>> 1a4a02a1aa0d816baad54dc90a46d69adb884c48

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route path="/" exact component={Home} />
<<<<<<< HEAD
        <Route path="/admin" component={Admin} />
=======
>>>>>>> 1a4a02a1aa0d816baad54dc90a46d69adb884c48
      </Switch>
    </Router>
  );
}

export default App;
