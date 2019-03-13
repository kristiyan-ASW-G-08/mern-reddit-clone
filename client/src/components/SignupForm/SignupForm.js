import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import signup from '../../authUtil/signup';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Input from '../Input/Input';
import Logo from '../../assets/logo.svg';
const SignupForm = props => {
  const [authErrors, setAuthErrors] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [matchPassword, setMatchPassword] = useState('');
  const [errorArr, setErrorsArr] = useState([]);
  const submitHandler = async e => {
    e.preventDefault();
    const signupProcess = await signup({
      email,
      password,
      matchPassword,
      username
    });
    const signupProcessData = await signupProcess;
    console.log(signupProcessData);
    if(signupProcessData === undefined){
      setAuthErrors([{param:'server-error',msg:`Server isn't availdable.Please try again later!`}])
    }
   else if (signupProcessData.authErrors) {
      setAuthErrors(signupProcessData.authErrors);
      const errors = signupProcessData.authErrors.map(error => {
        return error.param;
      });
      setErrorsArr(errors);
    } else {
      props.history.push(`/login`);
    }
  };

  return (
    <form className="form" onSubmit={e => submitHandler(e)}>
      <div className="form--logo">
        <img src={Logo} alt="logo" />
      </div>
      {authErrors ? <ErrorMessage errors={authErrors} /> : <></>}
      <Input
        setHook={setEmail}
        value={email}
        placeholder={'Email'}
        type={'email'}
        name={'email'}
        errorArr={errorArr}
      />
      <Input
        setHook={setUsername}
        value={username}
        placeholder={'Username'}
        type={'text'}
        name={'username'}
        errorArr={errorArr}
      />
      <Input
        setHook={setPassword}
        value={password}
        placeholder={'Password'}
        type={'password'}
        name={'passowrd'}
        errorArr={errorArr}
      />
      <Input
        setHook={setMatchPassword}
        value={matchPassword}
        placeholder={'Repeat your password'}
        type={'password'}
        name={'matchPassword'}
        errorArr={errorArr}
      />
      <button className="button">SIGN UP</button>
    </form>
  );
};
export default withRouter(SignupForm);
