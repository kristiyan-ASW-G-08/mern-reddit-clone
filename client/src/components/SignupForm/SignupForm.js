import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import signup from '../../authUtil/signup';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Input from '../Input/Input';
const SignupForm = props => {
  const [authErrors, setAuthErrors] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [matchPassword, setMatchPassword] = useState('');
  const [errorArr,setErrorsArr] = useState([])
//   const [usernameError, setUsernameError] = useState(false);
//   const [emailError, setEmailError] = useState(false);
//   const [passwordError, setPasswordError] = useState(false);
//   const [matchPasswordError, setMatchPasswordError] = useState(false);
  const submitHandler = async e => {
    e.preventDefault();
    const signupProcess = await signup({
      email,
      password,
      matchPassword,
      username
    });
    const signupProcessData = await signupProcess;
    if (signupProcessData.authErrors) {
      setAuthErrors(signupProcessData.authErrors);
      const errors =  signupProcessData.authErrors.map(error => {
          return error.param
      })
      setErrorsArr(errors)
    } else {
      setUsername('');
      setEmail('');
      setPassword('');
      setMatchPassword('');
    }
  };
  if (authErrors) {
    console.log(authErrors);
  }
  return (
    <form onSubmit={e => submitHandler(e)}>
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
        placeholder={'Repeat Password'}
        type={'password'}
        name={'matchPassword'}
        errorArr={errorArr}
      />
      <button>Submit</button>
    </form>
  );
};
export default withRouter(SignupForm);
