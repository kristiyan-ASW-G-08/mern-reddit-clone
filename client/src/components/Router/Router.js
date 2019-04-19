import React, { Fragment, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Loader from '../Loader';
import ProtectedRoute from '../ProtectedRoute';
import AntiLoggedInProtectedRoute from '.././AntiLoggedInProtectedRoute'
import { AuthContextConsumer } from '../../AuthContext/AuthContext';
import { ModalContextConsumer } from '../../ModalContext/ModalContext';
import Modal from '../Modal/Modal'
import UserCommunities from '../UserProfile/UserCommunities';
const HomePage = lazy(() => import('../HomePage/HomePage'));
const SignupForm = lazy(() => import('../SignupForm/SignupForm'));
const LoginForm = lazy(() => import('../LoginForm/LoginForm'));
const CommunityForm = lazy(() => import('../CommunityForm/CommunityForm'));
const PostForm = lazy(() => import('../PostForm/PostForm'));
const PostFull = lazy(() => import('../PostFull/PostFull'));
const Community = lazy(() => import('../Community/Community'));
const ModTools = lazy(() => import('../ModTools/ModTools'));
const UserProfile = lazy(() => import('../UserProfile/UserProfile'));
const UserPosts = lazy(() => import('../UserProfile/UserPosts'));
const UserComments = lazy(() => import('../UserProfile/UserComments'));
const UserSaved = lazy(() => import('../UserProfile/UserSaved'));
const UserUpvoted = lazy(() => import('../UserProfile/UserUpvoted'));
const UserDownvoted = lazy(() => import('../UserProfile/UserDownvoted'));
const Router = () => (
  <ModalContextConsumer>
    {modalData => {
      return (
        <AuthContextConsumer>
        {consumerData => {
          const { authState } = consumerData;
          const {isAuth} = authState
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

                    {/* <ProtectedRoute
                   exact
                   isAuth={isAuth}
                   Component={UserPosts}
                   path="/mod-tools/home/:communityName"
                 /> 
                   <ProtectedRoute
                   exact
                   isAuth={isAuth}
                   Component={UserUpvoted}
                   path="/mod-tools/reports/:communityName"
                 /> 
                   <ProtectedRoute
                   exact
                   isAuth={isAuth}
                   Component={UserDownvoted}
                   path="/mod-tools/customization/:communityName"
                 /> 
                   <ProtectedRoute
                   exact
                   isAuth={isAuth}
                   Component={UserSaved}
                   path="/mod-tools/rules/:communityName"
                 />  */}
                 
                 <ProtectedRoute
                   exact
                   isAuth={isAuth}
                   Component={UserPosts}
                   path="/user/posts"
                 /> 
                   <ProtectedRoute
                   exact
                   isAuth={isAuth}
                   Component={UserUpvoted}
                   path="/user/upvoted"
                 /> 
                   <ProtectedRoute
                   exact
                   isAuth={isAuth}
                   Component={UserDownvoted}
                   path="/user/downvoted"
                 /> 
                   <ProtectedRoute
                   exact
                   isAuth={isAuth}
                   Component={UserSaved}
                   path="/user/saved"
                 /> 
                   <ProtectedRoute
                   exact
                   isAuth={isAuth}
                   Component={UserCommunities}
                   path="/user/communities"
                 /> 
                   <ProtectedRoute
                   exact
                   isAuth={isAuth}
                   Component={UserComments}
                   path="/user/comments"
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
                      isAuth={isAuth}
                      Component={PostForm}
                      path="/create-post/:communityId"
                    />
                      <ProtectedRoute
                      exact
                      isAuth={isAuth}
                      Component={PostForm}
                      path="/edit-post/:postId"
                    />
                    <ProtectedRoute
                      exact
                      isAuth={isAuth}
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
      )
    }}
  </ModalContextConsumer>
 
);

export default Router;






