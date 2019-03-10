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

  const loginReducer = (authData) => dispatch({ type:LOGIN,authData})
  const logoutReducer = () => dispatch({type:LOGOUT,authData:{}})
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
export const AuthContextConsumer = Context.Consumer
export default AuthContext;
