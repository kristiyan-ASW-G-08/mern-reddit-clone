import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from '../Dropdown/Dropdown';
import logo from '../../assets/logo.svg';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContextData } from '../../AuthContext/AuthContext';
const Navbar = props => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">
        <img src={logo} alt="logo" />
      </Link>
      <Dropdown />
    </nav>
  );
};
export default Navbar;
