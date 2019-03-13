import React, { Fragment, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Loader from './Loader';
import ProtectedRoute from './ProtectedRoute';
import { AuthContextConsumer } from '../AuthContext/AuthContext';
const HomePage = lazy(() => import('./HomePage/HomePage'));
const SignupForm = lazy(() => import('./SignupForm/SignupForm'));
const LoginForm = lazy(() => import('./LoginForm/LoginForm'));
const CommunityForm = lazy(() => import('./CommunityForm/CommunityForm'));
const Router = () => (
  <AuthContextConsumer>
    {consumerData => {
      const { authState, loginReducer, logoutReducer } = consumerData;
      let { isAuth } = authState;
      return (
        <BrowserRouter>
          <>
            <Navbar isAuth={isAuth} />
            <div className="main--container">
              <Switch>
                <Route
                  path="/signup"
                  render={() => (
                    <Suspense fallback={<Loader />}>
                      <SignupForm />
                    </Suspense>
                  )}
                />
                <Route
                  path="/login"
                  render={() => (
                    <Suspense fallback={<Loader />}>
                      <LoginForm
                        loginReducer={loginReducer}
                        logoutReducer={logoutReducer}
                      />
                    </Suspense>
                  )}
                />
                 <ProtectedRoute exact isAuth={isAuth} Component={CommunityForm}  path="/create-community"/>
                  <Route
                  exact
                  path="/"
                  render={() => (
                    <Suspense fallback={<Loader />}>
                      <HomePage />
                    </Suspense>
                  )}
                />
               
              </Switch>
            </div>
          </>
        </BrowserRouter>
      );
    }}
  </AuthContextConsumer>
);

export default Router;
