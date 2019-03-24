import React, { useState, useContext, useEffect } from 'react';
import Input from '../Input/Input';
import { withRouter } from 'react-router-dom';
import ValidationErrorsList from '../ValidationErrorsList/ValidationErrorsList';
import postData from '../../util/postData';
import useValidationErrors from '../../hooks/useValidationErrors';
import { AuthContextData } from '../../AuthContext/AuthContext';
const CommentForm = props => {
  const { authState } = useContext(AuthContextData);
  const { isAuth, token } = authState;
  const {
    postId,
    setNewComment,
    toggle,
    editComment,
    setEditComment,
    setEditCommentElement
  } = props;
  const [content, setContent] = useState('');
  const [
    validationErrorMessages,
    validationErrorParams,
    toggleValidationErrors
  ] = useValidationErrors();
  useEffect(() => {
    if (isAuth && editComment) {
      setContent(editComment.content);
    }
  }, []);
  const cancelHandler = e => {
    e.preventDefault()
    toggle()
  }
  const submitHandler = async e => {
    e.preventDefault();
    if (isAuth) {
      let apiUrl = editComment
        ? `http://localhost:8080/edit-comment/${editComment._id}`
        : `http://localhost:8080/create-comment/${postId}`;
      const responseData = await postData(apiUrl, { content }, token);
      if (responseData.validationErrors) {
        toggleValidationErrors(responseData.validationErrors);
      } else {
        const { comment } = responseData;
        if (editComment) {
          setEditComment(false);
          setEditCommentElement(comment);
        } else {
          setNewComment(comment);
        }
        toggle();
      }
    }
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
      <button className="button" onClick={cancelHandler}>Cancel</button>
    </form>
  );
};

export default withRouter(CommentForm);
