import React, { useState } from 'react';
import Input from '../Input/Input';
import ValidationErrorsList from '../ValidationErrorsList/ValidationErrorsList';
import useValidationErrors from '../../hooks/useValidationErrors'

const PostForm = props => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [validationErrorMessages,validationErrorParams,toggleValidationErrors] = useValidationErrors()
  const submitHandler = () => {
    
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
export default PostForm;
