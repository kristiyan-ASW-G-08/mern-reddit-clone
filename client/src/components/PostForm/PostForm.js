import React, { useState ,useContext} from 'react';
import Input from '../Input/Input';
import { withRouter,} from 'react-router-dom';
import ValidationErrorsList from '../ValidationErrorsList/ValidationErrorsList';
import useValidationErrors from '../../hooks/useValidationErrors'
import createPost from './createPost'
import {AuthContextData} from '../../AuthContext/AuthContext'
const PostForm = props => {
  const {communityId} = props.match.params
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [validationErrorMessages,validationErrorParams,toggleValidationErrors] = useValidationErrors()
  const authState = useContext(AuthContextData)
  const submitHandler = e => {
    e.preventDefault()
    const {token} = authState.authState
    createPost(communityId,title,content,token)
  }
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
        setHook={setContent}
        value={content}
        placeholder={'Text (optional)'}
        type={'text'}
        name={'content'}
        validationErrorParams={validationErrorParams}
        textArea={true}
      />
      <button className="button">Post</button>
    </form>
  );
};
export default withRouter(PostForm);
