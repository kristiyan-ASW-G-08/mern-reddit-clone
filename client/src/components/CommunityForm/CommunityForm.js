import React, { useState, Fragment,useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Input from '../Input/Input';
import Logo from '../../assets/logo.svg';
import ValidationErrorsList from '../ValidationErrorsList/ValidationErrorsList';
import useValidationErrors from '../../hooks/useValidationErrors';
import {AuthContextData} from '../../AuthContext/AuthContext'
const CommunityForm = props => {
  const {authState} = useContext(AuthContextData)
  const {token} = authState
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [
    validationErrorMessages,
    validationErrorParams,
    toggleValidationErrors
  ] = useValidationErrors();
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
    console.log(responseData)
    console.log(response.status)
    if (responseData.message === 'Validation failed.') {
      toggleValidationErrors(responseData.data);
      const errors = responseData.data.map(error => {
        return error.param;
      });
      toggleValidationErrors(errors);
    } else if (response.status  === 201) {
      const { communityName } = responseData;
      props.history.push(`/community/${communityName}`);
    }
  };

  return (
    <form className="form" onSubmit={e => submitHandler(e)}>
      <h2>Create a Community</h2>
      <ValidationErrorsList validationErrorMessages={validationErrorMessages} />
      <Input
        setHook={setName}
        value={name}
        placeholder={'Community Name'}
        type={'text'}
        name={'name'}
        validationErrorParams={validationErrorParams}
      />
      <Input
        setHook={setDescription}
        value={description}
        placeholder={'Community Description'}
        type={'text'}
        name={'description'}
        validationErrorParams={validationErrorParams}
      />
      <button className="button">START</button>
    </form>
  );
};
export default withRouter(CommunityForm);
