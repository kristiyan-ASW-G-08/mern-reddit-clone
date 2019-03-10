import React, { useState } from 'react';
import Input from '../Input/Input';
import { withRouter } from 'react-router-dom';
import login from '../../authUtil/login';
import autoLogout from '../../authUtil/autoLogout';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
const LoginForm = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorArr, setErrorArr] = useState(false);
  const { logoutReducer, loginReducer } = props;
  const submitHandler = async e => {
    e.preventDefault();
    const loginProcess = await login({
      email,
      password
    });
    const loginProcessData = await loginProcess;
    if (loginProcessData.data) {
      setErrorArr([loginProcessData.data.param]);
    } else {
      loginReducer(loginProcessData, autoLogout, logoutReducer);
      setEmail('');
      setPassword('');
    }
  };
  return (
    <form onSubmit={e => submitHandler(e)}>
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
