import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "components/Nav";
import Home from "pages/Home/Home";
import theme from "styles/theme";
import GlobalStyles from "styles/GlobalStyles";
import { ThemeProvider } from "styled-components";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Nav />
        <GlobalStyles />
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
