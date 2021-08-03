import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "components/Nav";
import Home from "pages/Home/Home";
import theme from "styles/theme";
import GlobalStyles from "styles/GlobalStyles";
<<<<<<< HEAD
import Admin from "pages/Admin";
=======
import { ThemeProvider } from "styled-components";
>>>>>>> 50efb317826a902f862653d11a60cec9e80e539c

function App() {
  return (
    <Router>
<<<<<<< HEAD
      <GlobalStyles />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/admin" component={Admin} />
      </Switch>
=======
      <ThemeProvider theme={theme}>
        <Nav />
        <GlobalStyles />
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </ThemeProvider>
>>>>>>> 50efb317826a902f862653d11a60cec9e80e539c
    </Router>
  );
}

export default App;
