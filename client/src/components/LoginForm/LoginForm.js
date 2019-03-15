import React, { useState } from 'react';
import Input from '../Input/Input';
import { withRouter } from 'react-router-dom';
import login from '../../authUtil/login';
import ValidationErrorsList from '../ValidationErrorsList/ValidationErrorsList';
import Logo from '../../assets/logo.svg'
import useValidationErrors from '../../hooks/useValidationErrors'
const LoginForm = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrorMessages,validationErrorParams,toggleValidationErrors] = useValidationErrors()
  const { logoutReducer, loginReducer } = props;
  const submitHandler = async e => {
    e.preventDefault();
    const loginProcess = await login({
      email,
      password
    });
    const loginProcessData = await loginProcess;
    console.log(loginProcessData)
    if(loginProcessData === undefined){
      toggleValidationErrors([{param:'server-error',msg:`Server isn't availdable.Please try again later!`}])
     }
    else if (loginProcessData.data) {
      toggleValidationErrors(loginProcessData.data);
  
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
      <ValidationErrorsList validationErrors={validationErrorMessages} />
      <Input
        setHook={setEmail}
        value={email}
        placeholder={'Email'}
        type={'email'}
        name={'email'}
        errorArr={validationErrorParams}
      />
      <Input
        setHook={setPassword}
        value={password}
        placeholder={'Password'}
        type={'password'}
        name={'password'}
        errorArr={validationErrorParams}
      />
      <button>Login</button>
    </form>
  );
};

export default withRouter(LoginForm);