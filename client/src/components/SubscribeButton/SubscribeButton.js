import React from 'react';
import { withRouter } from 'react-router-dom';
import postData from '../../util/postData';
import useAuthContext from '../../hooks/useAuthContext/useAuthContext'
const SubscribeButtop = ({history,id}) => {
  const { isAuth, token,userId, userData,updateUserDataReducer } = useAuthContext();

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
        const authState = {isAuth,token,userId}
        updateUserDataReducer({
          authState,
          newUserData: responseData.userData
        });
      }
    } else history.push('/login');
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
