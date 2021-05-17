import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import { Login } from './Components/Login/Login';
import { Home } from './Components/Home/Home'

function App() {
  return (
    <Router>
    <div className="header">
      <Link className="link" to="/table">
        Table
      </Link>
        <Link className="link" to="/login">
          Login
        </Link>
    </div>

    <Switch>
      <Route path="/login">
            <Login />
      </Route>

      <Route path="/home">
          <Home />
      </Route>
    </Switch>
  </Router>
  );
}

export default App;
