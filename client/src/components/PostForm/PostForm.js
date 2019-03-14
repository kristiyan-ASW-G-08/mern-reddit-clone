import React, { useState } from 'react';
import Input from '../Input/Input';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
const PostForm = props => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errorArr, setErrorArr] = useState(false);
  return (
    <form className="form">
      {errorArr ? <ErrorMessage errors={errorArr} /> : <></>}
      <Input
        setHook={setTitle}
        value={title}
        placeholder={'Title'}
        type={'text'}
        name={'title'}
        errorArr={errorArr}
      />
        <Input
        setHook={setContent}
        value={content}
        placeholder={'Text (optional)'}
        type={'text'}
        name={'content'}
        errorArr={errorArr}
        textArea={true}
      />
      <button className="button">Post</button>
    </form>
  );
};
export default PostForm;
