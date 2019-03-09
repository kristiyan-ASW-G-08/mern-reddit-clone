import React, { useState, useReducer, createContext } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { authReducer, LOGIN,LOGOUT} from './reducers';
const Context = createContext();
const AuthContext = props => {
  const [authState, dispatch] = useReducer(authReducer, {
    isAuth: false,
    token: null,
    userId: null
  });

  console.log(authState)
  const login = (email,password) => dispatch({ type:LOGIN,authData:{email,password}})
  const logout = () => dispatch({type:LOGOUT,authData:{}})
  return (
    <Context.Provider
      value={{
        authState,
        login,
        logout
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
export const AuthContextConsumer = Context.Consumer
export default AuthContext;
