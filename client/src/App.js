import React, { Fragment,useState,lazy,Suspense } from 'react';
import logo from './logo.svg';
import './style/index.scss';
import Router from './components/Router'
import AuthContext from './AuthContext/AuthContext';
const  App  = () => {
  const [loading, setLoading] = useState(true);
  console.log(loading)
    return (
      <AuthContext>
        <Router>
      <div className="App">
      </div>
      </Router>
      </AuthContext>
    );
  
}

export default App;
