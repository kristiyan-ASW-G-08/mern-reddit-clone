import React, { useState, useContext, useEffect } from 'react';
import Input from '../../Input/Input';
import { withRouter } from 'react-router-dom';
import ValidationErrorsList from '../../ValidationErrorsList/ValidationErrorsList';
import createComment from './createComment';
import editCommentFunc from './editComment';
import useValidationErrors from '../../../hooks/useValidationErrors';
import { AuthContextData } from '../../../AuthContext/AuthContext';
const CommentForm = props => {
  const { authState } = useContext(AuthContextData);
  const { isAuth, token } = authState;
  const { postId, setNewComment, toggle, editComment,setEditComment,setEditCommentElement } = props;
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

  const submitHandler = async e => {
    e.preventDefault();
    if (isAuth && !editComment) {
      const commentData = await createComment(postId, content, token);
      if (commentData.comment) {
        setNewComment(commentData.comment);
        toggle();
      }
    } else if (isAuth && editComment) {
      const data = await editCommentFunc(editComment._id, content, token);
      const {comment} = data
      setEditComment(false)
      setEditCommentElement(comment)
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
    </form>
  );
};

export default withRouter(CommentForm);
