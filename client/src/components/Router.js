import React, { Fragment, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Loader from './Loader';
import ProtectedRoute from './ProtectedRoute';
import AntiLoggedInProtectedRoute from './AntiLoggedInProtectedRoute'
import { AuthContextConsumer } from '../AuthContext/AuthContext';
import { ModalContextConsumer } from '../ModalContext/ModalContext';
import Modal from './Modal/Modal'
const HomePage = lazy(() => import('./HomePage/HomePage'));
const SignupForm = lazy(() => import('./SignupForm/SignupForm'));
const LoginForm = lazy(() => import('./LoginForm/LoginForm'));
const CommunityForm = lazy(() => import('./CommunityForm/CommunityForm'));
const PostForm = lazy(() => import('./PostForm/PostForm'));
const PostFull = lazy(() => import('./PostFull/PostFull'));
const Community = lazy(() => import('./Community/Community'));
const UserPosts = lazy(() => import('./UserProfile/UserPosts'));
const UserComments = lazy(() => import('./UserProfile/UserComments'));
const UserSaved = lazy(() => import('./UserProfile/UserSaved'));
const UserUpvoted = lazy(() => import('./UserProfile/UserUpvoted'));
const UserDownvoted = lazy(() => import('./UserProfile/UserDownvoted'));
const UserCommunities = lazy(() => import('./UserProfile/UserCommunities'));
const ModTools = lazy(() => import('./ModTools/ModTools'));
const Router = () => (
  <ModalContextConsumer>
    {modalData => {
      console.log(modalData)
      return (
        <AuthContextConsumer>
        {consumerData => {
          const { authState } = consumerData;
          return (
            <BrowserRouter>
              <>
                <Navbar />
                <Modal/>
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
                     <ProtectedRoute
                      exact
                      authState={authState}
                      Component={ModTools}
                      path={["/mod-tools/home/:communityName","/mod-tools/reports/:communityName","/mod-tools/customization/:communityName","/mod-tools/rules/:communityName"]}
                    /> 
    
                     <Route
                      path="/community/:communityName"
                      render={props => (
                        <Suspense fallback={<Loader />}>
                          <Community {...props} />
                        </Suspense>
                      )}
                    /> 
                     <Route
                      path="/post/:postId"
                      render={props => (
                        <Suspense fallback={<Loader />}>
                          <PostFull {...props} />
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
                      Component={PostForm}
                      path="/edit-post/:postId"
                    />
                    <ProtectedRoute
                      exact
                      authState={authState}
                      Component={CommunityForm}
                      path="/create-community"
                    />
                   <ProtectedRoute
                    exact
                    authState={authState}
                    Component={UserPosts}
                    path="/user/posts"
                  /> 
                    <ProtectedRoute
                    exact
                    authState={authState}
                    Component={UserComments}
                    path="/user/comments"
                  /> 
                    <ProtectedRoute
                    exact
                    authState={authState}
                    Component={UserSaved}
                    path="/user/saved"
                  /> 
                   <ProtectedRoute
                    exact
                    authState={authState}
                    Component={UserUpvoted}
                    path="/user/upvoted"
                  /> 
                 <ProtectedRoute
                    exact
                    authState={authState}
                    Component={UserDownvoted}
                    path="/user/downvoted"
                  /> 
                   <ProtectedRoute
                    exact
                    authState={authState}
                    Component={UserCommunities}
                    path="/user/communities"
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
      )
    }}
  </ModalContextConsumer>
 
);

export default Router;






