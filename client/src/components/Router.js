import React, { Fragment, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Loader from './Loader';
import ProtectedRoute from './ProtectedRoute';
import AntiLoggedInProtectedRoute from './AntiLoggedInProtectedRoute'
import { AuthContextConsumer } from '../AuthContext/AuthContext';
const HomePage = lazy(() => import('./HomePage/HomePage'));
const SignupForm = lazy(() => import('./SignupForm/SignupForm'));
const LoginForm = lazy(() => import('./LoginForm/LoginForm'));
const CommunityForm = lazy(() => import('./CommunityForm/CommunityForm'));
const PostForm = lazy(() => import('./PostForm/PostForm'));
const Community = lazy(() => import('./Community/Community'));
const Router = () => (
  <AuthContextConsumer>
    {consumerData => {
      const { authState } = consumerData;
      return (
        <BrowserRouter>
          <>
            <Navbar />
            <div className="main--container">
              <Switch>
                
                <AntiLoggedInProtectedRoute
                  exact
                  authState={authState}
                  Component={LoginForm}
                  path="/login"
                />
                 <AntiLoggedInProtectedRoute
                  exact
                  authState={authState}
                  Component={SignupForm}
                  path="/signup"
                />
                <Route
                  path="/community/:communityName"
                  render={props => (
                    <Suspense fallback={<Loader />}>
                      <Community {...props} />
                    </Suspense>
                  )}
                />
                   <ProtectedRoute
                  exact
                  authState={authState}
                  Component={PostForm}
                  path="/create-post/:communityId"
                />
                <ProtectedRoute
                  exact
                  authState={authState}
                  Component={CommunityForm}
                  path="/create-community"
                />

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
