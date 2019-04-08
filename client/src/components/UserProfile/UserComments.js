import React, { useState, useEffect, lazy, Suspense ,useContext} from 'react';
import Loader from '../Loader';
import Toggle from '../Toggle/Toggle';
import CommentForm from '../CommentsContainer/CommentForm';
import getData from '../../util/getData';
import {AuthContextData} from '../../AuthContext/AuthContext'
import CommentsContainer from '../CommentsContainer/CommentsContainer'
const UserComments = props => {
  const [comments, setComments] = useState(false);
  const [page, setPage] = useState(1);
  const [editComment, setEditComment] = useState(false);
  const {authState} = useContext(AuthContextData)
  const {isAuth,userId} = authState
  const { postId } = props;
  useEffect(() => {
    const apiUrl = `http://localhost:8080/user/comments/${userId}`;
    getData(apiUrl).then(data => {
      if (data.comments) {
        setComments(data.comments);
      }
    });
  }, []);

  const getNextPage = async () => {
    await setPage(page + 1);
    const apiUrl = `http://localhost:8080/user/comments/${userId}?page=${page + 1}`;
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
export default UserComments;
