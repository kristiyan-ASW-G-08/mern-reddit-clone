import React, { Fragment, useContext, memo } from 'react';
import { AuthContextData } from '../../AuthContext/AuthContext';
import { withRouter } from 'react-router-dom';
import postData from '../../util/postData';
const SubscribeButtop = props => {
  const { authState, updateUserDataReducer } = useContext(AuthContextData);
  const { id } = props;
  const { isAuth, token, userData } = authState;
  let redirect = '';
  let subscribed = false;
  if (isAuth) {
    subscribed = userData.communities.includes(id);
  }
  const message = subscribed ? 'Unsubscribe' : 'Subscribe';
  const subscribeHandler = async () => {
    if (isAuth) {
      const apiUrl = subscribed
        ? `http://localhost:8080/user/unsubscribe/${id}`
        : `http://localhost:8080/user/subscribe/${id}`;
      const responseData = await postData(apiUrl, {}, token);
      if (responseData.userData) {
        updateUserDataReducer({
          authState,
          newUserData: responseData.userData
        });
      }
    } else props.history.push('/login');
  };
  return (
    <>
      <button onClick={subscribeHandler} className="button">
        {message}
      </button>
    </>
  );
};
export default withRouter(SubscribeButtop);
