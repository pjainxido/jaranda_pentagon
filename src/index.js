import React from "react";
import ReactDOM from "react-dom";
import theme from "styles/theme";
import GlobalStyles from "styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
