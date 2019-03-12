import React, { Fragment, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Loader from './Loader'
// const  Home = lazy(() => import('./Home') )
import {AuthContextConsumer} from '../AuthContext/AuthContext';
const SignupForm = lazy(() => import('./SignupForm/SignupForm'));
const LoginForm = lazy(() => import('./LoginForm/LoginForm'));
const Router = () =>  (
    <AuthContextConsumer>
        {consumerData =>  {
            const {authState,loginReducer,logoutReducer} = consumerData
            let {isAuth} = authState
            console.log(authState)

            return (
<BrowserRouter>
    <>
      <Navbar isAuth={isAuth} />
      <div className="main--container">
      <Switch>
       
      <Route
          path="/signup"
          render={() => (
            <Suspense fallback={<Loader/>}>
              <SignupForm   />
            </Suspense>
          )}
        />
        <Route
          path="/login"
          render={() => (
            <Suspense fallback={<Loader/>}>
              <LoginForm  loginReducer={loginReducer} logoutReducer={logoutReducer}  />
            </Suspense>
          )}
        />
      </Switch>
      </div>
    </>
  </BrowserRouter>
            )
        }}
  
  </AuthContextConsumer>
);

export default Router;
