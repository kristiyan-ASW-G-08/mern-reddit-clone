import React, { useState, useReducer, createContext,useEffect } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { authReducer, LOGIN,LOGOUT,USERUPDATE} from './reducers';
import autoLogout from '../authUtil/autoLogout'
const Context = createContext();
const AuthContext = props => {
  const [authState, dispatch] = useReducer(authReducer, {
    isAuth: false,
    token: null,
    userId: null,
    userData:null
  });

 
  const loginReducer = (authData) => dispatch({ type:LOGIN,authData}) 
  const updateUserDataReducer = (authData) => dispatch({ type:USERUPDATE,authData}) 
  const logoutReducer = () => dispatch({type:LOGOUT,authData:{}})
  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    const userData = JSON.parse(localStorage.getItem('userData'))
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      logoutReducer()
      return;
    }
    const userId = localStorage.getItem('userId');
    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
    loginReducer({isAuth:true,token,userId,userData})
   

  },[])
  return (
    <Context.Provider
      value={{
        authState,
        loginReducer,
        logoutReducer,
        updateUserDataReducer
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
export const AuthContextData = Context ;
export const AuthContextConsumer = Context.Consumer
export default AuthContext;
