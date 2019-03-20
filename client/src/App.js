import React, { Fragment,useState,lazy,Suspense } from 'react';
import logo from './logo.svg';
import './style/index.scss';
import Router from './components/Router'
import AuthContext from './AuthContext/AuthContext';
import CommunityContext from './CommunityContext/CommunityContext';
import Community from './components/Community/Community';
const  App  = () => {
  // const [loading, setLoading] = useState(true);
    return (
      <div className='layout' >
      <AuthContext>
        <Router />
      </AuthContext>
      </div>
    );
  
}

export default App;
