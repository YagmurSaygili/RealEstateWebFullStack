import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import CreateProperty from "./pages/CreateProperty";
import Property from "./pages/Property";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((Response) => {
        if (Response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        setAuthState(false);
      });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <a href="/">Home Page</a>
            <a href="/createproperty">Create a Property</a>
            <a href="/emptypage">Empty Page</a>
            {!authState && ( // To not displaying when user logged in
              <>
                <a href="/login">Login</a>
                <a href="/registration">Registration</a>
              </>
            )}
          </div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/createproperty" exact component={CreateProperty} />
            <Route path="/property/:id" exact component={Property} />
            <Route path="/login" exact component={Login} />
            <Route path="/registration" exact component={Registration} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
