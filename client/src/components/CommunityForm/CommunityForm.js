import React, { useState, Fragment, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Input from '../Input/Input';
import ValidationErrorsList from '../ValidationErrorsList/ValidationErrorsList';
import useValidationErrors from '../../hooks/useValidationErrors/useValidationErrors'
import postData from '../../util/postData';
import useAuthContext from '../../hooks/useAuthContext/useAuthContext'
const CommunityForm = props => {
  const { token } = useAuthContext()
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const {
    validationErrorMessages,
    validationErrorParams,
    toggleValidationErrors
   } = useValidationErrors();
  const submitHandler = async e => {
    e.preventDefault();
    const apiUrl = 'http://localhost:8080/community/post';
    const community = {
      name,
      description
    };
    const responseData = await postData(apiUrl, community, token);
    if (responseData.validationErrors) {
      toggleValidationErrors(responseData.validationErrors);
    } else {
      const { communityName } = responseData;
      props.history.replace(`/community/${communityName}`);
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
