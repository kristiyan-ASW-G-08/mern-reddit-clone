import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import signup from '../../authUtil/signup';
import ValidationErrorsList from '../ValidationErrorsList/ValidationErrorsList';
import useValidationErrors from '../../hooks/useValidationErrors';
import Input from '../Input/Input';
import Logo from '../../assets/logo.svg';
const SignupForm = props => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [matchPassword, setMatchPassword] = useState('');
  const [
    validationErrorMessages,
    validationErrorParams,
    toggleValidationErrors
  ] = useValidationErrors();
  const submitHandler = async e => {
    e.preventDefault();
    const signupProcess = await signup({
      email,
      password,
      matchPassword,
      username
    });
    const signupProcessData = await signupProcess;
    if (signupProcessData === undefined) {
      toggleValidationErrors([
        {
          param: 'server-error',
          msg: `Server isn't availdable.Please try again later!`
        }
      ]);
    } else if (signupProcessData.authErrors) {
      toggleValidationErrors(signupProcessData.authErrors);
    } else {
      props.history.push(`/login`);
    }
  };

  return (
    <form className="form" onSubmit={e => submitHandler(e)}>
      <div className="form--logo">
        <img src={Logo} alt="logo" />
      </div>
      <ValidationErrorsList validationErrorMessages={validationErrorMessages} />
      <Input
        setHook={setEmail}
        value={email}
        placeholder={'Email'}
        type={'email'}
        name={'email'}
        validationErrorParams={validationErrorParams}
      />
      <Input
        setHook={setUsername}
        value={username}
        placeholder={'Username'}
        type={'text'}
        name={'username'}
        validationErrorParams={validationErrorParams}
      />
      <Input
        setHook={setPassword}
        value={password}
        placeholder={'Password'}
        type={'password'}
        name={'passowrd'}
        validationErrorParams={validationErrorParams}
      />
      <Input
        setHook={setMatchPassword}
        value={matchPassword}
        placeholder={'Repeat your password'}
        type={'password'}
        name={'matchPassword'}
        validationErrorParams={validationErrorParams}
      />
      <button className="button">SIGN UP</button>
    </form>
  );
};
export default withRouter(SignupForm);
