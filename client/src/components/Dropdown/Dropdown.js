import React, { useState, Fragment, useContext } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuthContext from '../../hooks/useAuthContext/useAuthContext'
import { Link } from 'react-router-dom';
import {
  faCog,
  faMoon,
  faCaretDown,
  faUser,
  faOm
} from '@fortawesome/free-solid-svg-icons';
library.add(faCaretDown, faCog, faMoon, faUser);
const Dropdown = props => {
  const { isAuth, logoutReducer } = useAuthContext()
  const [active, setActive] = useState(false);
  let dropdownBody;
  const dropDownHandler = () => {
    setActive(!active);
  };
  if (active) {
    dropdownBody = (
      <ul className="dropdown__body">
  
        {isAuth ? (
          <>
            <li>
              <Link data-testid="create-community" to="/create-community">
                Create Community
              </Link>
            </li>
            <li>
              <Link data-testid="user-settings" to="/user/posts">
                My Profile
              </Link>
            </li>
         
            <li>User Settings</li>
            <li>
              <button className="button" onClick={logoutReducer}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link data-testid="signup" to="/signup">
                SignUp
              </Link>
            </li>
            <li>
              <Link data-testid="login" to="/login">
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    );
  }
  return (
    <div className="dropdown">
      <div className="dropdown__header">
        <button className="dropdown__button button" onClick={dropDownHandler}>
          <div className="dropdown__button__icon">
            <FontAwesomeIcon icon="user" />
          </div>
          <div className="dropdown__button__icon dropdown__button__icon--dark">
            <FontAwesomeIcon icon="caret-down" />
          </div>
        </button>
      </div>
      {dropdownBody}
    </div>
  );
};
export default Dropdown;
