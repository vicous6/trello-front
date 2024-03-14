import React, { useEffect } from "react";
import TrelloOAuth from "../models/trelloAuth.js";
import Logo from "../assets/logo.png";
import {redirect} from "react-router-dom";

function Login() {
  const trelloAuth = new TrelloOAuth("http://localhost:5173/main");

  const loginWithTrello = () => {
    const authUrl = trelloAuth.getAuthorizationUrl();
    window.location.href = authUrl;
  };

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token)
        if(token && token !== "undefined"){
            window.location.href = "/main";
        }
    }, []);

  return (
      <div id="loginPage">
          <img src={Logo} alt="NOTED logo"/>
          <div>
                  <button onClick={loginWithTrello}>Se connecter avec Trello</button>
          </div>
      </div>
  );
}

export default Login;
