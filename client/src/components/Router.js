import React, { Fragment, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Loader from './Loader'
// const  Home = lazy(() => import('./Home') )
import {AuthContextConsumer} from '../AuthContext/AuthContext';
const SignupForm = lazy(() => import('./SignupForm/SignupForm'));

const Router = () =>  (
    <AuthContextConsumer>
        {consumerData =>  {
            const {authState} = consumerData
            let {isAuth,} = authState
            return (
<BrowserRouter>
    <>
      <Navbar isAuth={isAuth} />
      <Switch>
      <Route
          path="/signup"
          render={() => (
            <Suspense fallback={<Loader/>}>
              <SignupForm   />
            </Suspense>
          )}
        />
      </Switch>
    </>
  </BrowserRouter>
            )
        }}
  
  </AuthContextConsumer>
);

export default Router;
