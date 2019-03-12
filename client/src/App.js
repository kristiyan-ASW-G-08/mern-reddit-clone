import React, { Fragment,useState,lazy,Suspense } from 'react';
import logo from './logo.svg';
import './style/index.scss';
import Router from './components/Router'
import AuthContext from './AuthContext/AuthContext';
const  App  = () => {
  const [loading, setLoading] = useState(true);
  console.log(loading)
    return (
      <div className='layout'>
      <AuthContext>
        <Router />
      </AuthContext>
      </div>
    );
  
}

export default App;
