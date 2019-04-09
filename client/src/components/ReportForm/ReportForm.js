import React, { useState, Fragment,useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import ValidationErrorsList from '../ValidationErrorsList/ValidationErrorsList';
import useValidationErrors from '../../hooks/useValidationErrors/useValidationErrors';
import useModalContext from '../../hooks/useModalContext/useModalContext';
import useDocumentTitle from '../../hooks/useDocumentTitle/useDocumentTitle'
import useAuthContext from '../../hooks/useAuthContext/useAuthContext'
import Input from '../Input/Input';
import Logo from '../../assets/logo.svg';
import postData from '../../util/postData'
import getData from '../../util/getData'
const ReportForm = ({history,post}) => {
    const {userId,token} = useAuthContext()
    const {toggleModalReducer}  = useModalContext()
  const [rules,setRules]  = useState(null)
  const [rule,setRule]  = useState(null)
  const [password, setPassword] = useState('');
  const [matchPassword, setMatchPassword] = useState('');
  useDocumentTitle('Sign Up')
  const {
    validationErrorMessages,
    validationErrorParams,
    toggleValidationErrors
   } = useValidationErrors();
   
   useEffect(() => {
     const apiUrl = `http://localhost:8080/community/rules/get/${post.communityId}`
     getData(apiUrl)
     .then(data => {
         console.log(data)
         if(data.rules) setRules(data.rules)
     })
   }, [])
  const submitHandler = async e => {
    e.preventDefault();
    const apiUrl = `http://localhost:8080/community/report/${post._id}`
    if(rule){
        const {authorId,communityId,_id} = post
        const report = {
            ruleId:rule,
            communityId:communityId,
            postAuthorId: authorId,
            reportAuthorId:userId
        }
        const responseData = await postData(apiUrl,report,token)
        console.log(responseData)
    }
    // const signupData = {
    //   email,
    //   password,
    //   matchPassword,
    //   username
    // }
    // const responseData = await postData(apiUrl,signupData,'')
    // if (responseData === undefined) {
    //   toggleValidationErrors([
    //     {
    //       param: 'server-error',
    //       msg: `Server isn't available.Please try again later!`
    //     }
    //   ]);
    // } else if (responseData.validationErrors) {
    //   toggleValidationErrors(responseData.validationErrors);
    // } else {
    //   history.replace(`/login`);
    // }
  };
  const cancelHandler  = () => {
      toggleModalReducer({on:false,message:null,Component:null})
  }
  return (
    <form className="form" onSubmit={e => submitHandler(e)}>
      <ValidationErrorsList validationErrorMessages={validationErrorMessages} />
      {rules ?   
      <select className="input" defaultValue="default" onChange={e => setRule(e.target.value)} >
    <option  value="default"  disabled="disabled">Select A Rule</option>
      {
         rules.map(rule => <option key={rule._id} value={rule._id}>{rule.title}</option>) 
      }
      </select> : '' }
    
      <div className="buttons-container">
      <button className="button">SIGN UP</button>
      <button onClick={cancelHandler} className="button">Cancel</button></div>
     
    </form>
  );
};
export default withRouter(ReportForm);
