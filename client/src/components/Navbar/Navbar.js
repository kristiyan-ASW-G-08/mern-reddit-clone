import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
const Navbar = props => {
  const { isAuth } = props;
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li>
          <NavLink to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        {isAuth ? (
          <li>
            <NavLink data-testid="logout"  to="/logout" activeClassName="active">
              Logout
            </NavLink>
          </li>
        ) : (
          <>
            <li>
              <NavLink data-testid="signup" to="/signup" activeClassName="active">
                SignUp
              </NavLink>
            </li>
            <li>
              <NavLink data-testid="login" to="/login" activeClassName="active">
                Login
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
export default Navbar;
