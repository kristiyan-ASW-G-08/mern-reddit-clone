import React, { useState, useContext } from 'react';
import Input from '../../Input/Input';
import { withRouter } from 'react-router-dom';
import ValidationErrorsList from '../../ValidationErrorsList/ValidationErrorsList';
import createComment from './createComment'
import useValidationErrors from '../../../hooks/useValidationErrors';
import { AuthContextData } from '../../../AuthContext/AuthContext';
const CommentForm = props => {
  const { authState } = useContext(AuthContextData);
  const {isAuth,token} = authState
  const {postId} = props
  const [content, setContent] = useState('');
  const [
    validationErrorMessages,
    validationErrorParams,
    toggleValidationErrors
  ] = useValidationErrors();
  const submitHandler = async e => {
      console.log('click')
      console.log(postId)
    e.preventDefault();
    if(isAuth){
        console.log()
        const commentData = await createComment(postId,content,token)
        if(commentData.comment){
            
        }
        console.log(commentData)
    }
    // const loginProcess = await login({
    //   email,
    //   password
    // });
    // const loginProcessData = await loginProcess;
    // if (loginProcessData === undefined) {
    //   toggleValidationErrors([
    //     {
    //       param: 'server-error',
    //       msg: `Server isn't availdable.Please try again later!`
    //     }
    //   ]);
    // } else if (loginProcessData.data) {
    //   toggleValidationErrors(loginProcessData.data);
    // } else {
    //   loginReducer(loginProcessData);
    //   props.history.replace(`/`)
    
    // }
  };
  return (
    <form className="form comment-form" onSubmit={e => submitHandler(e)}>
      <ValidationErrorsList validationErrorMessages={validationErrorMessages} />
      <Input
        setHook={setContent}
        value={content}
        placeholder={'What are your thoughts?'}
        type={'text'}
        name={'content'}
        validationErrorParams={validationErrorParams}
        textArea={true}
      />
      <button className="button">Comment</button>
    </form>
  );
};

export default withRouter(CommentForm);
