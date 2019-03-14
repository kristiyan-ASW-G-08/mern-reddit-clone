import React, { useState, Fragment,useContext } from 'react';
import { withRouter } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Input from '../Input/Input';
import Logo from '../../assets/logo.svg';
import {AuthContextData} from '../../AuthContext/AuthContext'

const CommunityForm = props => {
  console.log(props);
  const {authState} = useContext(AuthContextData)
  const { token } = authState.authData;
  const [authErrors, setAuthErrors] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errorArr, setErrorsArr] = useState([]);

  const submitHandler = async e => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/create-community', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        description
      })
    });

    const responseData = await response.json();
    console.log(responseData);
    if (responseData.message === 'Validation failed.') {
      setAuthErrors(responseData.data);
      const errors = responseData.data.map(error => {
        return error.param;
      });
      console.log(errors);
      setErrorsArr(errors);
    } else if (responseData.message === 'Community created!') {
      const {communityName} = responseData
      props.history.push(`/community/${communityName}`);
    }
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
