import React,{Suspense} from "react";
import { Route, Redirect } from "react-router-dom";
import Loader from './Loader'
 const ProtectedRoute = ({
  Component,
<<<<<<< HEAD
  authState,
=======
  isAuth,
>>>>>>> refactored user routes
  ...rest
}) => {
  return (
    <Route
<<<<<<< HEAD

      {...rest}
      render={props => {
        if (authState.isAuth) {
          return  <Suspense fallback={<Loader />}>
          <Component  authState={authState}
          />
=======
      {...rest}
      render={props => {
        if (isAuth) {
          return  <Suspense fallback={<Loader />}>
          <Component />
>>>>>>> refactored user routes
        </Suspense>;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
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