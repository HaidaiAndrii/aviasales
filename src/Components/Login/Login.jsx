import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import style from './styles.module.css';

export const Login = () => {
    let history = useHistory();
    let [userLogin, setLogin] = useState(false)
    let [userPass, setPass] = useState(false)

    async function logining () {
        const defaultUser = {
            login: 'user',
            pass: 'user'
        }

        if(userLogin === defaultUser.login && userPass === defaultUser.pass) {
            console.log('your in');
            history.push("/home");
        }
    }

return(
    <div className={style.formbox}>
          <form className={style.form}>
          <h2 className={style.title}>Sign In</h2>
          <input className={style.input} type="text" placeholder="Login" onChange={(event) => setLogin(event.target.value)} />
          <input   className={style.input} type="pass" placeholder="Password" onChange={(event) => setPass(event.target.value)} />
          <button  className={style.button} type="button" onClick={logining}>Login</button>
          </form>  
        </div>
     )   

};