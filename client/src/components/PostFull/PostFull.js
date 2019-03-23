import React, {
  useContext,
  useEffect,
  useState,
  Fragment,
  lazy,
  Suspense
} from 'react';
import { AuthContextData } from '../../AuthContext/AuthContext';
import getData from '../../util/getData'
import PostContainer from './PostContainer/PostContainer';
import Loader from '../Loader';
import PostComments from './PostComments'
const PostFull = props => {
  const authState = useContext(AuthContextData);
  const [post, setPost] = useState(null);
  const { isAuth, userId, token } = authState.authState;
  const { postId } = props.match.params;
  useEffect(() => {
    const apiUrl = `http://localhost:8080/get-post/${postId}`
    const responseData = getData(apiUrl)
    .then(data => {
      if (data.post) {
        setPost(data.post);
      }
    })
  }, []);
  return (
    <>
      {post ? (
        <Suspense fallback={<Loader />}>
          <>
            <div className="post-full">
              <PostContainer post={post} userId={userId} token={token} />
              
              <PostComments postId={post._id}/>
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
