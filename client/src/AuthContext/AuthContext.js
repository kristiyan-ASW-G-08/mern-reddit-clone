import React, { useState, useReducer, createContext } from 'react';
import { authReducer, LOGIN,SIGNUP } from './reducers';
const Context = createContext();
const AuthContext = props => {
  const [authState, dispatch] = useReducer(authReducer, {
    isAuth: false,
    token: null,
    userId: null
  });

  const {isAuth,token,userId} = authState

  const login = (email,password) => dispatch({ type:LOGIN,authData:{email,password}})
  const signup = (email,password,matchPassword,username) => dispatch({type:SIGNUP,authData:{email,password,matchPassword,username}})
  const logout = () => dispatch({type:SIGNUP,authData:{}})
  return (
    <Context.Provider
      value={{
        isAuth,
        token,
        userId,
        login,
        signup,
        logout
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
export const AuthContextConsumer = Context.Consumer
export default AuthContext;
