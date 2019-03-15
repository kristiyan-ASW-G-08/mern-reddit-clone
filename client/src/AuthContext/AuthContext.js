import React, { useState, useReducer, createContext,useEffect } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { authReducer, LOGIN,LOGOUT} from './reducers';
import autoLogout from '../authUtil/autoLogout'
const Context = createContext();
const AuthContext = props => {
  const [authState, dispatch] = useReducer(authReducer, {
    isAuth: false,
    token: null,
    userId: null,
  });
  const loginReducer = (authData) => dispatch({ type:LOGIN,authData})
  const logoutReducer = () => dispatch({type:LOGOUT,authData:{}})
  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      logoutReducer()
      return;
    }
    const userId = localStorage.getItem('userId');
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    loginReducer({isAuth:true,token,userId})
   
    // autoLogout(remainingMilliseconds,logoutReducer)
  },[])
  return (
    <Context.Provider
      value={{
        authState,
        loginReducer,
        logoutReducer
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
export const AuthContextData = Context ;
export const AuthContextConsumer = Context.Consumer
export default AuthContext;
