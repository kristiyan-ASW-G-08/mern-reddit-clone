import React,{Suspense,useState} from "react";
import { Route, Redirect } from "react-router-dom";
import Loader from './Loader'
import {AuthContextData} from '../AuthContext/AuthContext'
import React from 'react'
const ComponentName= props => {

    return (

    )
}
export default ComponentName
 const ProtectedRoute = ({
  Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (authState.isAuth) {
          return  <Suspense fallback={<Loader />}>
          <Component  authState={authState}
          />
        </Suspense>;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                  error:'Please log in to view this resource.'
                }
              }}
            />
          );
        }
      }}
    />
  );
};
export default ProtectedRoute