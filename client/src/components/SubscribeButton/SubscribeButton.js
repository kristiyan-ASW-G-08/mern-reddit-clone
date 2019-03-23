import React, { Fragment, useContext, memo } from 'react';
import { AuthContextData } from '../../AuthContext/AuthContext';
import {  Redirect } from 'react-router-dom';
import postData from '../../util/postData'
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
  
const subscribeHandler = async () => {
  if(isAuth){
    const apiUrl = subscribed ? `http://localhost:8080/unsubscribe/${id}` : `http://localhost:8080/subscribe/${id}`
        const responseData = await postData(apiUrl,{},token)
        if(responseData.userData){
          updateUserDataReducer({ authState, newUserData: responseData.userData });
        }
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
