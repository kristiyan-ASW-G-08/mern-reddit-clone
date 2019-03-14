import React, { useState } from 'react';
import Input from '../Input/Input';
import { withRouter } from 'react-router-dom';
import login from '../../authUtil/login';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Logo from '../../assets/logo.svg'
import {AuthContextData} from '../../AuthContext/AuthContext'
const LoginForm = props => {
  const {authState} = useContext(AuthContextData)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorArr, setErrorArr] = useState(false);
  const { logoutReducer, loginReducer } = authState;
  const submitHandler = async e => {
    e.preventDefault();
    const loginProcess = await login({
      email,
      password
    });
    const loginProcessData = await loginProcess;
    if(loginProcessData === undefined){
      setErrorArr([{param:'server-error',msg:`Server isn't availdable.Please try again later!`}])
    }
    else if (loginProcessData.data) {
      setErrorArr([loginProcessData.data.param]);
    } 
    else {
      loginReducer(loginProcessData,logoutReducer);
      setEmail('');
      setPassword('');
    }
  };
  return (
    <form className="form" onSubmit={e => submitHandler(e)}>
      <div className="form--logo">
      <img src={Logo} alt="logo" />
      </div>
      {errorArr ? <ErrorMessage errors={errorArr} /> : <></>}
      <Input
        setHook={setEmail}
        value={email}
        placeholder={'Email'}
        type={'email'}
        name={'email'}
        errorArr={errorArr}
      />
      <Input
        setHook={setPassword}
        value={password}
        placeholder={'Password'}
        type={'password'}
        name={'password'}
        errorArr={errorArr}
      />
      <button>Login</button>
    </form>
  );
};

export default withRouter(LoginForm);
