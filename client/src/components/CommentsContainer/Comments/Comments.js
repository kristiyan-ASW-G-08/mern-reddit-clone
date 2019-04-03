import React, { Fragment, lazy } from 'react';
import Comment from '../Comment/Comment';
import PropTypes ,{func,bool} from 'prop-types';
import commentsArrType from '../../PropTypes/commentsArrType'
const Comments = ({
  comments,
  deleteCommentElement,
  toggle,
  setEditComment,
  on
}) => {
  return (
    <>
      <div className="comments" data-testid="comments">
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
      </div>
    </>
  );
};

Comments.propTypes = {
  comments: commentsArrType.isRequired,
  deleteCommentElement: func.isRequired,
  toggle: func.isRequired,
  setEditComment: func.isRequired,
  on: bool.isRequired
};
export default Comments;
