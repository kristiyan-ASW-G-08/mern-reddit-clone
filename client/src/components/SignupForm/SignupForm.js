import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import ValidationErrorsList from '../ValidationErrorsList/ValidationErrorsList';
import useValidationErrors from '../../hooks/useValidationErrors/useValidationErrors';
import useDocumentTitle from '../../hooks/useDocumentTitle/useDocumentTitle'
import Input from '../Input/Input';
import Logo from '../../assets/logo.svg';
import postData from '../../util/postData'
const SignupForm = ({history}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [matchPassword, setMatchPassword] = useState('');
  useDocumentTitle('Sign Up')
  const {
    validationErrorMessages,
    validationErrorParams,
    toggleValidationErrors
   } = useValidationErrors();
   
  const submitHandler = async e => {
    e.preventDefault();
    const apiUrl = 'http://localhost:8080/auth/signup'
    const signupData = {
      email,
      password,
      matchPassword,
      username
    }
    const responseData = await postData(apiUrl,signupData,'')
    if (responseData === undefined) {
      toggleValidationErrors([
        {
          param: 'server-error',
          msg: `Server isn't available.Please try again later!`
        }
      ]);
    } else if (responseData.validationErrors) {
      toggleValidationErrors(responseData.validationErrors);
    } else {
      history.replace(`/login`);
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
