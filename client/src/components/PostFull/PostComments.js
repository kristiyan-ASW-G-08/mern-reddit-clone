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
  const apiUrl = `http://localhost:8080/comments/${postId}?page=${page}`;
  useEffect(() => {
    getData(apiUrl).then(data => {
      if (data.comments) {
        setComments(data.comments);
      }
    });
  }, []);

  const getNextPage = async () => {
    setPage(page + 1);
    const responseData = await getData(apiUrl);
    if (responseData.comments) {
      setComments(comments.concat(responseData.comments));
    }
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
                  <button
                    className="button button-toggle"
                    onClick={() => {
                      setEditComment(false);
                      toggle();
                    }}
                  >
                    {on ? 'Close' : 'Comment'}
                  </button>
                </div>
                <CommentsContainer
                  comments={comments}
                  deleteCommentElement={deleteCommentElement}
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
