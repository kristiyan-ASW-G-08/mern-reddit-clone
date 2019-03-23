import React, { Fragment,lazy } from 'react';
const Comment = lazy(() => import('./Comment'))
const Comments = ({ comments,deleteCommentElement,toggle,setEditComment,on}) => {
  return (
    <>
      {comments.map(comment => {
        return (
            <Comment
            key={comment._id}
            comment={comment}
            deleteCommentElement={deleteCommentElement}
            toggle={toggle}
            on={on}
            setEditComment={setEditComment}
          />
        );
      })}
    </>
  );
};
export default Comments;
