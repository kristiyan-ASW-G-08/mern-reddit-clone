import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from '../Dropdown/Dropdown'
import logo from '../../assets/logo.svg'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navbar = props => {
  const { isAuth,logoutReducer } = props;
  return (
    <nav className="navbar">
        <Link to="/" className="navbar__logo">
            <img src={logo} alt="logo"/>
         </Link>
      <ul className="nav-list nav-list-mobile">
        {isAuth ? (
          <li>
            <Link data-testid="logout"  to="/logout" >
              Logout
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Link data-testid="signup" to="/signup" >
                SignUp
              </Link>
            </li>
            <li>
              <Link data-testid="login" to="/login" >
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
      <Dropdown isAuth={isAuth} logoutReducer={logoutReducer} />
    </nav>
  );
};
export default Navbar;
