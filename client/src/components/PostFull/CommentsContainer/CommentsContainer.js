import React, { useState, useEffect, lazy, Suspense } from 'react';
import Loader from '../../Loader';
import getComments from './getComments';
import Toggle from '../../Toggle/Toggle';
import CommentForm from '../CommentForm/CommentForm';
const Comment = lazy(() => import('./Comment/Comment'));
const CommentsContainer = props => {
  const [comments, setComments] = useState(false);
  const [page, setPage] = useState(1);
  const [editComment, setEditComment] = useState(false);
  const { postId } = props;
  useEffect(() => {
    getComments(postId, page).then(data => {
      setComments(data.comments);
    });
  }, []);

  const getNextPage = () => {
    setPage(page + 1);
    getComments(postId, page + 1).then(data => {
      setComments(comments.concat(data.comments));
    });
  };
  const setNewComment = comment => {
    const editedComments = [...comments, comment];
    setComments(editedComments);
  };
  const deleteCommentElement = commentId => {
    const editedComments = comments.filter(
      comment => comment._id !== commentId
    );
    setComments(editedComments);
  };
  const setEditCommentElement = (editedComment) => {
    const editedComments = comments.filter(
      comment => comment._id !== editedComment._id
    );
    
    setComments([...editedComments,editedComment]);
  }
  return (
    <>
      {comments ? (
        <Suspense fallback={<Loader />}>
          <Toggle>
            {({ on, toggle }) => (
              <>
                <div>
                  {on ? (
                    <CommentForm
                      postId={postId}
                      setNewComment={setNewComment}
                      toggle={toggle}
                      editComment={editComment}
                      setEditComment={setEditComment}
                      setEditCommentElement={setEditCommentElement}
                    />
                  ) : (
                    ''
                  )}
                  <button className="button button-toggle" onClick={() => {setEditComment(false);toggle()}}>
                    {on ? 'Close' : 'Comment'}
                  </button>
                </div>
                <div className="comments-container">
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
                  <button
                    onClick={getNextPage}
                    className="button load-more-button"
                  >
                    Load More
                  </button>
                </div>
              </>
            )}
          </Toggle>
        </Suspense>
      ) : (
        <Loader />
      )}
    </>
  );
};
export default CommentsContainer;
