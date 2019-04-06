import React, {
  useContext,
  useEffect,
  useState,
  Fragment,
  lazy,
  Suspense
} from 'react';
import { AuthContextData } from '../../AuthContext/AuthContext';
import getData from '../../util/getData';
import Loader from '../Loader';
import PostComments from './PostComments';
import Post from '../PostsContainer/Post/Post'
const PostFull = props => {
  const authState = useContext(AuthContextData);
  const [post, setPost] = useState(null);
  const { isAuth, userId, token } = authState.authState;
  const { postId } = props.match.params;
  
  useEffect(() => {
    const apiUrl = `http://localhost:8080/post/get/${postId}`;
    const responseData = getData(apiUrl).then(data => {
      if (data.post) {
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
              <Post post={post} isFull={true}/>
              <PostComments postId={post._id} />
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
