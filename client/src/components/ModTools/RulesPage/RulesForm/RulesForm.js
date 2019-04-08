import React, { useState ,useEffect} from 'react';
import Input from '../../../Input/Input';
import { withRouter } from 'react-router-dom';
import ValidationErrorsList from '../../../ValidationErrorsList/ValidationErrorsList';
import useValidationErrors from '../../../../hooks/useValidationErrors/useValidationErrors';
import useAuthContext from '../../../../hooks/useAuthContext/useAuthContext';
import  useModalContext from '../../../../hooks/useModalContext/useModalContext'
import postData from '../../../../util/postData'
import Community from '../../../Community/Community';
const RulesForm = ({communityId,toggle,setNewRule,editRule,editRules,setEditRule,history}) => {

  const {isAuth,token} = useAuthContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(''); 
  const {toggleModalReducer} = useModalContext()
  const {
    validationErrorMessages,
    validationErrorParams,
    toggleValidationErrors
  } = useValidationErrors();


  useEffect(() => {
    console.log(editRule)
   if(editRule){
    setTitle(editRule.title)
    setDescription(editRule.description)
   }
  },[])
  
  const cancelHandler = e => {
    e.preventDefault()
    toggle()
  }
  const submitHandler = async e => {
   e.preventDefault()
    if (isAuth) {
      console.log(editRule)
      let apiUrl = editRule
        ? `http://localhost:8080/community/rule/edit/${editRule._id}`
        : `http://localhost:8080/community/rule/post/${communityId}`;
      const responseData = await postData(apiUrl, { title,description }, token);
      console.log(responseData)
      if (responseData.validationErrors) {
        toggleValidationErrors(responseData.validationErrors);
      } else {
        const { rule } = responseData;
        if (editRule) {
          toggleModalReducer({on:true,message:'Rule was successfully edited!'})
          setEditRule(null);
          editRules(rule);
        } else {
          toggleModalReducer({on:true,message:'Rule was successfully added!'})
          setNewRule(rule);
        }
        toggle();
      }
    }else {
      history.push(`/login`);
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
        setHook={setDescription}
        value={description}
        placeholder={'Full description'}
        type={'textarea'}
        name={'description'}
        validationErrorParams={validationErrorParams}
        textArea={true}
      />
      <button>ADD NEW RULE</button>
      <button onClick={cancelHandler}>Cancel</button>
    </form>
  );
}
export default RulesForm