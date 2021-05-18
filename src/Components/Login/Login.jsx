import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import style from './styles.module.css';
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/hook-auth";



export const Login = () => {
    let history = useHistory() || [];
    const auth = useAuth();


    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data =>  {
      let status = auth.signin(data.login, data.password);
      if(status) {
        history.push('/home')
      }
    }
    // console.log(localStorage.getItem('reactUser'))


return(
    <div className={style.formbox}>
        <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className={style.title}>Sign In</h2>
      <input className={style.input} placeholder="Login" {...register("login", { required: true })} />
      
      <input className={style.input} placeholder="Password" {...register("password", { required: true })} />
      {errors.exampleRequired && <span>This field is required</span>}
      
      <input type="submit" className={style.button} />
    </form>
          {/* <form className={style.form}>
          <h2 className={style.title}>Sign In</h2>
          <input className={style.input} type="text" placeholder="Login" onChange={(event) => setLogin(event.target.value)} />
          <input   className={style.input} type="pass" placeholder="Password" onChange={(event) => setPass(event.target.value)} />
          <button  className={style.button} type="button" onClick={logining}>Login</button>
          </form>   */}
        </div>
     )   

};