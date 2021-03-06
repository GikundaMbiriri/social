import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import store from "./redux/store";
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import Navbar from "./components/Navbar";
import jwtDecode from "jwt-decode";
import AuthRoute from "./util/AuthRoute";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userAction";
import axios from "axios";
axios.defaults.baseURL =
  "https://us-central1-peter-87987.cloudfunctions.net/api";
const theme = createMuiTheme({
  palette: {
    light: "#33c9dc",
    main: "#00bxd4",
    dark: "#008394",
    contrastText: "#fff",
  },
  secondary: {
    light: "#ff6333",
    main: "#ff3d00",
    dark: "b22a00",
    contrastText: "#fff",
  },
  spread: {
    typography: {
      useNextVariants: true,
    },
    form: {
      textAlign: "center",
    },
    image1:{
      width: "70px",
      height:"70px"
    },
    image: {
      margin: "20px auto 20px auto",
      width: "70px",
    },
    pageTitle: {
      margin: "10px auto 10px auto",
    },
    TextField: {
      margin: "10px auto 10px auto",
    },
    button: {
      marginTop: 20,
      position: "relative",
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: 10,
    },
    progress: {
      position: "absolute",
    },
  },
});

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    store.dispatch(logoutUser());
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/signup" component={signup} />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
