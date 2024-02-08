import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import CreateProperty from "./pages/CreateProperty";
import Property from "./pages/Property";
import Login from "./pages/Login";

import ChangePassword from "./pages/ChangePassword";
import Registration from "./pages/Registration";
import Profile from "./pages/Profile";
import PageNotFound from "./pages/PageNotFound";


import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";


function App() {
  const [authState, setAuthState] = useState({
    // Inıtial state of authState
    username: "",
    id: 0, // user id
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((Response) => {
        if (Response.data.error) {
          setAuthState({ ...authState, satus: false });
        } else {
          setAuthState({
            username: Response.data.username,
            id: Response.data.id, // user id
            status: true,
          });
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        setAuthState(false);
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <div className="links">
              {!authState.status ? ( // To not displaying when user logged in
                <>
                  <a href="/login">Login</a>
                  <a href="/registration">Registration</a>
                </>
              ) : (
                <>
                  <a href="/">Home Page</a>
                  <a href="/createproperty">Create a Property</a>
                </>
              )}
            </div>
            <div className="loggedInContainer">
              <h1>{authState.username} </h1>
              {authState.status && <button onClick={logout}> Logout</button>}
            </div>
          </div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/createproperty" exact component={CreateProperty} />
            <Route path="/property/:id" exact component={Property} />
            <Route path="/login" exact component={Login} />
            <Route path="/profile/:id" exact component={Profile} />
            <Route path="/changepassword" exact component={ChangePassword} />
            <Route path="/registration" exact component={Registration} />
            <Route path="*" exact component={PageNotFound} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
