import React, { Fragment, lazy, Suspense,useContext } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Loader from './Loader';
import ProtectedRoute from './ProtectedRoute';
const HomePage = lazy(() => import('./HomePage/HomePage'));
const SignupForm = lazy(() => import('./SignupForm/SignupForm'));
const LoginForm = lazy(() => import('./LoginForm/LoginForm'));
const CommunityForm = lazy(() => import('./CommunityForm/CommunityForm'));
const Community = lazy(() => import('./Community/Community'));
const PostForm = lazy(() => import('./PostForm/PostForm'));
const Router = () => {


   return (
    <BrowserRouter>
    <>
      <Navbar />
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
                <LoginForm/>
              </Suspense>
            )}
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
            Component={CommunityForm}
            path="/create-community"
          />
          <ProtectedRoute
            exact
            Component={PostForm}
            path="/create-post/:communityName"
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
   )
        
}

export default Router;
