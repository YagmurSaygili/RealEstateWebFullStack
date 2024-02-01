import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {AuthContext} from "../helpers/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let history = useHistory();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((Response) => {
      if (Response.data.error) {
        alert(Response.data.error);
      } else {
        console.log("Login Successfull!!");
        localStorage.setItem("accessToken", Response.data);
        setAuthState(true);
        history.push("/"); // Pushin to the home page works but because of the problem I have beforewhich manually refreshing ...
      }
    });
  };
  return (
    <div className="loginContainer">
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={login}> Login </button>
    </div>
  );
}

export default Login;
