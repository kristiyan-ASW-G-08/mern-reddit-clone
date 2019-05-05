import React, { Fragment,useState,lazy,Suspense } from 'react';
import './style/index.scss';


import Router from './components/Router/Router'
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
