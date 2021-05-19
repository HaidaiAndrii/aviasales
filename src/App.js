import './App.css';
import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import { Login } from './Components/Login/Login';
import { Home } from './Components/Home/Home'
import { useAuth } from "./hooks/hook-auth.js";

function App() {
  const { user, signout } = useAuth();

  return (

    <Router>
    <div className="header">
      <Link className="link" to="/home">
        Home
      </Link>
      
       {user ? (
        <button className="link"  onClick={signout}>
          Log out
        </button>
      ) : (
        <Link className="link" to="/login">
          Login
        </Link>)
      }

        </div>
        <div className="logo">
    </div>

<div className="wrapper">

    <Switch>
      <Route path="/login">
            <Login />
      </Route>

      
      <Route path="/home">
        {user ? <Home /> : <Redirect push to="/login"></Redirect>
        }
          {/* <Home /> */}
      </Route>
    </Switch>
</div>
  </Router>

  );

}

export default App;
