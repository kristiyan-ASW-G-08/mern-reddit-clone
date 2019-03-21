import React, {
  useContext,
  useEffect,
  useState,
  Fragment,
  lazy,
  Suspense
} from 'react';
import { AuthContextData } from '../../AuthContext/AuthContext';
import getPost from './getPost';
import PostContainer from './PostContainer/PostContainer';
import Toggle from '../Toggle/Toggle';
import CommentForm from './CommentForm/CommentForm';
import Loader from '../Loader';
import CommentsContainer from './CommentsContainer/CommentsContainer'
const PostFull = props => {
  const authState = useContext(AuthContextData);
  const [post, setPost] = useState(null);
  const { isAuth, userId, token } = authState.authState;
  const { postId } = props.match.params;
  console.log(props);
  useEffect(() => {
    getPost(postId).then(data => {
      if (data.post) {
        console.log(data.post);
        setPost(data.post);
      }
    });
  }, []);
  return (
    <>
      {post ? (
        <Suspense fallback={<Loader />}>
          <>
            <div className="post-full">
              <PostContainer post={post} userId={userId} token={token} />
              <Toggle>
                {({ on, toggle }) => (
                  <div>
                    {on ? <CommentForm postId={post._id} /> : ''}
                    <button className="button button-toggle" onClick={toggle}>
                      {on ? 'Close' : 'Comment'}
                    </button>
                  </div>
                )}
              </Toggle>
              <CommentsContainer postId={post._id}/>
            </div>
          </>
        </Suspense>
      ) : (
        <Loader />
      )}
    </>
  );
};
export default PostFull;
