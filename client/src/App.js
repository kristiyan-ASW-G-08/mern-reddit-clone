import React, { Fragment,useState,lazy,Suspense } from 'react';
import logo from './logo.svg';
import './style/index.scss';
const Loader  = lazy(() => import ('./components/Loader'))
const  App  = () => {
  const [loading, setLoading] = useState(true);
  console.log(loading)
    return (
      <div className="App">
      </div>
    );
  
}

export default App;
