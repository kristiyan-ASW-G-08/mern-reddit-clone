import React,{Suspense} from "react";
import { Route, Redirect } from "react-router-dom";
import Loader from './Loader'
 const ProtectedRoute = ({
  Component,
  authState,
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