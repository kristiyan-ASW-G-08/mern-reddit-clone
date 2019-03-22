import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContextData } from '../../AuthContext/AuthContext';
const UserProfile = props => {
  const { authState } = useContext(AuthContextData);
  console.log(authState);
  console.log(props)
  return (
    <div>
      <NavLink to="/user-profile/posts" activeClassName="active">
        Posts
      </NavLink>
      <NavLink to="/user-profile/comment" activeClassName="active">
        Comment
      </NavLink>
      <NavLink to="/user-profile/saved" activeClassName="active">
        Saved
      </NavLink>
    </div>
  );
};
export default UserProfile;
