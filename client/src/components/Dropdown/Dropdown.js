import React, { useState, Fragment, useContext } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContextData } from '../../AuthContext/AuthContext';
import { Link } from 'react-router-dom';
import {
  faCog,
  faMoon,
  faCaretDown,
  faUser
} from '@fortawesome/free-solid-svg-icons';
library.add(faCaretDown, faCog, faMoon, faUser);
const Dropdown = props => {
  const { authState, logoutReducer } = useContext(AuthContextData);
  const { isAuth } = authState;
  const [active, setActive] = useState(false);
  let dropdownBody;
  const dropDownHandler = () => {
    setActive(!active);
  };
  if (active) {
    dropdownBody = (
      <ul className="dropdown__body">
        <li>Night Mode</li>

        <li>Visit Reddit</li>
        {isAuth ? (
          <>
            <li>
              <Link data-testid="create-community" to="/create-community">
                Create Community
              </Link>
            </li>
            <li>
              <Link data-testid="logout" to="/logout">
                Logout
              </Link>
            </li>
            <li>
              <Link data-testid="user-settings" to="/user/posts">
                My Profile
              </Link>
            </li>
         
            <li>User Settings</li>
            <li>
              <button onClick={logoutReducer}>Logout</button>
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
