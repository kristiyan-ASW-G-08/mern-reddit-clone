import React from 'react';
import CommentBar from '../CommentBar';
import PropTypes from 'prop-types';
import commentType from '../../PropTypes/commentType'
const Comment = ({
  comment,
  deleteCommentElement,
  toggle,
  setEditComment,
  on
}) => {
  console.log(comment.comments)
  const {
    content,
    author,
    upvotes,
    downvotes,
    creationDate,

  } = comment;
  const dateObject = new Date(Date.parse(creationDate));
  const dateReadable = dateObject.toDateString();
  return (
    <div className="comment">
      <div className="comment-details">
        <p className="comment-author">{author}</p>
        <p className="comment-date">{dateReadable}</p>
      </div>
      <h5 className="comment-content">{content}</h5>
      {/* <CommentBar
        authorId={comment.authorId}
        comments={comments}
        deleteCommentElement={deleteCommentElement}
        commentId={comment._id}
        toggle={toggle}
        setEditComment={setEditComment}
        comment={comment}
        on={on}
      /> */}
    </div>
  );
};
// Comment.propTypes = {
//   // comment:commentType.isRequired,
//   deleteCommentElement: PropTypes.func.isRequired,
//   toggle: PropTypes.func.isRequired,
//   setEditComment: PropTypes.func.isRequired,
//   on: PropTypes.bool.isRequired
// };

export default Comment;
