import React, { Fragment,useState,lazy,Suspense } from 'react';
import './style/index.scss';
import Router from './components/Router'
import AuthContext from './AuthContext/AuthContext';
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
