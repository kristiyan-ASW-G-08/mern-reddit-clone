import React, { Fragment,useState,lazy,Suspense } from 'react';
import './style/index.scss';
<<<<<<< HEAD
import Router from './components/Router'
=======
import Router from './components/Router/Router'
>>>>>>> refactored user routes
import AuthContext from './AuthContext/AuthContext';
import ModalContext from './ModalContext/ModalContext';
const  App  = () => {
    return (
      <div className='layout' >
      <ModalContext>
      <AuthContext>
        <Router />
      </AuthContext>
      </ModalContext>
      </div>
    );
  
}

export default App;
