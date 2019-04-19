import React,{lazy,useContext} from 'react';
import ProtectedRoute from '../ProtectedRoute' 
import useAuthContext from '../../hooks/useAuthContext/useAuthContext'
const UserPosts = lazy(() => import('../UserProfile/UserPosts'));
  const UserRoutes = ({isAuth}) => {
    return (
  
        <ProtectedRoute
                   
                      isAuth={isAuth}
                      Component={UserPosts}
                      path="/user/posts"
                    /> 

    );
  };
  export default UserRoutes;
  