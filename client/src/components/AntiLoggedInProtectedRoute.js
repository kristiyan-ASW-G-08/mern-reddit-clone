import React,{Suspense} from "react";
import { Route, Redirect } from "react-router-dom";
import Loader from './Loader'
 const AntiLoggedInProtectedRoute = ({
  Component,
  authState,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (authState.isAuth) {
            return (
                <Redirect
                  to={{
                    pathname: "/",
                    state: {
                      from: props.location,
                      error:'You are alreadt logged in.'
                    }
                  }}
                />
              );
        
        } else {
            return  <Suspense fallback={<Loader />}>
            <Component  />
          </Suspense>;
        }
      }}
    />
  );
};
export default AntiLoggedInProtectedRoute