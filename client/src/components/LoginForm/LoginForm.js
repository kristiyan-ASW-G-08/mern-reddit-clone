import React, { useState ,useEffect} from 'react';
import Input from '../Input/Input';
import { withRouter } from 'react-router-dom';
import login from '../../authUtil/login';
import ValidationErrorsList from '../ValidationErrorsList/ValidationErrorsList';
import Logo from '../../assets/logo.svg';
import useValidationErrors from '../../hooks/useValidationErrors/useValidationErrors';
import useAuthContext from '../../hooks/useAuthContext/useAuthContext';
import useDocumentTitle from '../../hooks/useDocumentTitle/useDocumentTitle'
import  useModalContext from '../../hooks/useModalContext/useModalContext'
const LoginForm = ({history}) => {
const { loginReducer } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {toggleModalReducer} = useModalContext()
  useDocumentTitle('Login')
  const {
    validationErrorMessages,
    validationErrorParams,
    toggleValidationErrors
  } = useValidationErrors();


  useEffect(() => {
    if(history.location.state && history.location.state.message ){
      const {message} = history.location.state
      toggleModalReducer({on:true,message})
    }
  },[])
  
  const submitHandler = async e => {
    e.preventDefault();
    const loginProcess = await login({
      email,
      password
    });
    const loginProcessData = await loginProcess;
    if (loginProcessData === undefined) {
      toggleValidationErrors([
        {
          param: 'server-error',
          msg: `Server isn't available.Please try again later!`
        }
      ]);
    } else if (loginProcessData.data) {
      toggleValidationErrors(loginProcessData.data);
    } else {
      loginReducer(loginProcessData);
      history.replace(`/`);
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
        setHook={setPassword}
        value={password}
        placeholder={'Password'}
        type={'password'}
        name={'password'}
        validationErrorParams={validationErrorParams}
      />
      <button>Login</button>
    </form>
  );
};

export default withRouter(LoginForm);
