import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Input from '../Input/Input';
import Logo from '../../assets/logo.svg';
const CommunityForm = props => {
  const [authErrors, setAuthErrors] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errorArr, setErrorsArr] = useState([]);
  const submitHandler = async e => {
    e.preventDefault();

  };

  return (
    <form className="form" onSubmit={e => submitHandler(e)}>
      {/* <div className="form--logo">
        <img src={Logo} alt="logo" />
      </div> */}
      <h2>Create a Community</h2>
      {authErrors ? <ErrorMessage errors={authErrors} /> : <></>}
      <Input
        setHook={setName}
        value={name}
        placeholder={'Community Name'}
        type={'text'}
        name={'name'}
        errorArr={errorArr}
      />
     <Input
        setHook={setDescription}
        value={description}
        placeholder={'Community Description'}
        type={'text'}
        name={'description'}
        errorArr={errorArr}
      />
      <button className="button">START</button>
    </form>
  );
};
export default withRouter(CommunityForm);