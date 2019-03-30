import React, { useState, useContext, useEffect } from 'react';
import Input from '../Input/Input';
import { withRouter } from 'react-router-dom';
import ValidationErrorsList from '../ValidationErrorsList/ValidationErrorsList';
import useValidationErrors from '../../hooks/useValidationErrors/useValidationErrors';
import { AuthContextData } from '../../AuthContext/AuthContext';
import postData from '../../util/postData';
import useAuthContext from '../../hooks/useAuthContext/useAuthContext'
const PostForm = props => {
  const { communityId } = props.match.params;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const {token}  = useAuthContext()
  const {
    validationErrorMessages,
    validationErrorParams,
    toggleValidationErrors
   } = useValidationErrors();
  const submitHandler = async e => {
    e.preventDefault();
    let postId;
    let apiUrl;
    const post = {
      title,
      content
    };
    if (props.match.params.postId) {
      postId = props.match.params.postId;
      apiUrl = `http://localhost:8080/post/edit/${postId}`;
    } else {
      apiUrl = `http://localhost:8080/post/post/${communityId}`;
    }
    const responseData = await postData(apiUrl, post, token);
    if (responseData.validationErrors) {
      toggleValidationErrors(responseData.validationErrors);
    } else {
      postId = postId ? postId : responseData.postId;
      props.history.replace(`/post/${postId}`);
    }
  };

  useEffect(() => {
    if (props.match.params.postId) {
      const { post } = props.history.location;
      const { content, title } = post;
      setTitle(title);
      setContent(content);
    }
  }, []);
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
