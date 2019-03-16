import React, { Fragment, useContext, memo } from 'react';
import { AuthContextData } from '../../AuthContext/AuthContext';
import {  Redirect } from 'react-router-dom';

import subscribe from './subscribe';
import unsubscribe from './unsubscribe';
const SubscribeButtop = props => {
  const { authState, updateUserDataReducer } = useContext(AuthContextData);
  const { id } = props;
  const { isAuth, token, userData } = authState;
  let redirect = '';
  let subscribed = false;
  let message = 'Subscribe';
  if (isAuth) {
    subscribed = userData.communities.includes(id);
    if (subscribed) {
      message = 'Unsubscribe';
    }
  }
  const subscribeHandler = () => {
    if (isAuth && !subscribed) {
      subscribe(id, token).then(data => {
        if (data) {
          updateUserDataReducer({ authState, newUserData: data });
        }
      });
    } else if (isAuth && subscribed) {
      unsubscribe(id, token).then(data => {
        updateUserDataReducer({ authState, newUserData: data });
      });
    } else {
      redirect = (
        <Redirect
          to={{
            pathname: '/login',
            state: {
              from: props.location,
              error: 'Please log in to subscribe.'
            }
          }}
        />
      );
    }
  };
  return (
    <>
      {redirect}
      <button onClick={subscribeHandler} className="button">
        {message}
      </button>
    </>
  );
};
export default SubscribeButtop;
