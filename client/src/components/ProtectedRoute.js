import React,{Suspense} from "react";
import { Route, Redirect } from "react-router-dom";
import Loader from './Loader'
 const ProtectedRoute = ({
  Component,
  isAuth,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuth) {
          return  <Suspense fallback={<Loader />}>
          <Component {...props}
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