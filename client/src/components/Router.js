import React, { Fragment, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Loader from './Loader'
// const  Home = lazy(() => import('./Home') )
import {AuthContextConsumer} from '../AuthContext/AuthContext';
const SignupForm = lazy(() => import('./SignupForm/SignupForm'));

const Router = () => (
    <AuthContextConsumer>
        {consumerData => {
            console.log(consumerData)
            const {isAuth} = consumerData
            return (
<BrowserRouter>
    <>
      <Navbar isAuth={isAuth} />
      <Switch>
 
      </Switch>
    </>
  </BrowserRouter>
            )
        }}
  
  </AuthContextConsumer>
);

export default Router;
