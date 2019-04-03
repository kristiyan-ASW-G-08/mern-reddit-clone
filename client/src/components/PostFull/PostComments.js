import React, { useState, useEffect, lazy, Suspense } from 'react';
import Loader from '../Loader';
import Toggle from '../Toggle/Toggle';
import CommentForm from '../CommentsContainer/CommentForm';
import getData from '../../util/getData';
import CommentsContainer from '../CommentsContainer/CommentsContainer'
const PostComments = props => {
  const [comments, setComments] = useState(false);
  const [page, setPage] = useState(1);
  const [editComment, setEditComment] = useState(false);
  const { postId } = props;
  useEffect(() => {
    const apiUrl = `http://localhost:8080/comment/comments/${postId}?page=${page}`;
    getData(apiUrl).then(data => {
      if (data.comments) {
        setComments(data.comments);
      }
    });
  }, []);

  const getNextPage = async () => {
    setPage(page + 1);
    const apiUrl = `http://localhost:8080/comment/comments/${postId}?page=${page + 1}`;
    const responseData = await getData(apiUrl);
    if (responseData.comments) {
      setComments(comments.concat(responseData.comments));
    }
  };
  const setNewComment = comment => {
    const editedComments = [...comments, comment];
    setComments(editedComments);
  };
  const setEditCommentElement = editedComment => {
    const editedComments = comments.filter(
      comment => comment._id !== editedComment._id
    );

    setComments([...editedComments, editedComment]);
  };
  return (
    <>
      {comments ? (
        <Suspense fallback={<Loader />}>
          <Toggle>
            {({ on, toggle }) => (
              <>
                <div className="comment-form-container">
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
                  <button
                    className="button button-toggle comment-button"
                    onClick={() => {
                      setEditComment(false);
                      toggle();
                    }}
                  >
                    {on ? 'Close' : 'Comment'}
                  </button>
                </div>
                <CommentsContainer
                setComments={setComments}
                  comments={comments}
                  toggle={toggle}
                  setEditComment={setEditComment}
                  on={on}
                  getNextPage={getNextPage}
                />
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
export default PostComments;
