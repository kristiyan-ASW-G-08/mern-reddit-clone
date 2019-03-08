import React, { useState, useReducer, createContext } from 'react';
import { authReducer, LOGIN } from './reducers';
const Context = createContext();
const AuthContext = props => {
  const [authState, dispatch] = useReducer(authReducer, {
    isAuth: false,
    token: null,
    userId: null
  });

  const {isAuth,token,userId} = authState

  const login = (email,password) => {
    dispatch({ type:LOGIN,authData:{email,password}})
  }
  return (
    <Context.provicer
      value={{
        isAuth,
        token,
        userId
      }}
    >
      {props.children}
    </Context.provicer>
  );
};

export default AuthContext;
