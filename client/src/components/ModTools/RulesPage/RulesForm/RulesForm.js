import React, { useState ,useEffect} from 'react';
import Input from '../../../Input/Input';
import { withRouter } from 'react-router-dom';
import ValidationErrorsList from '../../../ValidationErrorsList/ValidationErrorsList';
import useValidationErrors from '../../../../hooks/useValidationErrors/useValidationErrors';
import useAuthContext from '../../../../hooks/useAuthContext/useAuthContext';
import  useModalContext from '../../../../hooks/useModalContext/useModalContext'
import postData from '../../../../util/postData'
const RulesForm = ({history}) => {
const {isAuth,token} = useAuthContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reason, setReason] = useState('');
  const {toggleModalReducer} = useModalContext()
  const {
    validationErrorMessages,
    validationErrorParams,
    toggleValidationErrors
  } = useValidationErrors();


  useEffect(() => {
   
  },[])
  
  const submitHandler = async e => {
    e.preventDefault();
    console.log(reason,title,description)
    const apiUrl = `http://localhost:8080/community/rule/post/:communityId`
    const rule = {
        reason,
        title,
        description
    }
    const responseData = await postData(apiUrl,rule,token)
    if (responseData.validationErrors) {
        toggleValidationErrors(responseData.validationErrors);
      } else {
       console.log(responseData)
      }
    
  };
  return (
    <form className="form" onSubmit={e => submitHandler(e)}>
      <ValidationErrorsList validationErrorMessages={validationErrorMessages} />
      <Input
        setHook={setTitle}
        value={title}
        placeholder={'Title'}
        type={'text'}
        name={'title'}
        validationErrorParams={validationErrorParams}
      />
      <Input
        setHook={setReason}
        value={reason}
        placeholder={'Report reason'}
        type={'text'}
        name={'reason'}
        validationErrorParams={validationErrorParams}
      />
      <Input
        setHook={setDescription}
        value={description}
        placeholder={'Full description'}
        type={'textarea'}
        name={'description'}
        validationErrorParams={validationErrorParams}
        textArea={true}
      />
      <button>ADD NEW RULE</button>
    </form>
  );
}
export default RulesForm