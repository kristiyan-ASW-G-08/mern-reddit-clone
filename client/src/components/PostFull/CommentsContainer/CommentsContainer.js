import React, { useState, useEffect, lazy, Suspense,} from 'react';
import Loader from '../../Loader';
import getComments from './getComments';
const Comment = lazy(() => import('./Comment/Comment'));
const CommentsContainer = props => {
  const [comments, setComments] = useState(false);
  const [page,setPage] = useState(1)
  const { postId } = props;

  useEffect(() => {
    getComments(postId,page).then(data => {
      console.log(data);
      setComments(data.comments);
    });
  }, []);

  const getNextPage = () => {
    console.log('next')
    setPage(page + 1)
    getComments(postId,page + 1).then(data => {
      console.log(data);
      setComments(comments.concat(data.comments));
    });
  } 
  return (
    <>
      {comments ? (
        <Suspense fallback={<Loader />}>
        <div  className="comments-container" >
      {comments.map(comment => {
            return <Comment key={comment._id} comment={comment}/>;
          })}
          <button onClick={getNextPage} className="button load-more-button">Load More</button>
          </div>
        </Suspense>
      ) : (
        <Loader/>
      )}
      </>
  );
};
export default CommentsContainer;