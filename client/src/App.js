import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import CreateProperty from "./pages/CreateProperty";
import Property from "./pages/Property";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <a href="/">Home Page</a>
          <a href="/createproperty">Create a Property</a>
          <a href="/emptypage">Empty Page</a>
          <a href="/login">Login</a>
          <a href="/registration">Registration</a>
        </div>
        <Switch>
          <Route  path="/" exact component={Home} />
          <Route  path="/createproperty" exact component={CreateProperty} />
          <Route  path="/property/:id" exact component={Property} />
          <Route  path="/login" exact component={Login} />
          <Route  path="/registration" exact component={Registration} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
