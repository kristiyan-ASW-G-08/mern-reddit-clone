import React, { useState, useEffect, lazy, Suspense,} from 'react';
import Loader from '../Loader';
import getPosts from './getPosts';
const Post = lazy(() => import('../Post/Post'));
const PostsContainer = props => {
  const [posts, setPosts] = useState(false);
  const [page,setPage] = useState(1)
  const { communityId } = props;

  useEffect(() => {
    getPosts(communityId,page).then(data => {
      console.log(data);
      setPosts(data.posts);
    });
  }, []);

  const getNextPage = () => {
    console.log('next')
    setPage(page + 1)
    getPosts(communityId,page + 1).then(data => {
      console.log(data);
      setPosts(posts.concat(data.posts));
    });
  } 
  
 
 
  return (
    <>
      {posts ? (
        <Suspense fallback={<Loader />}>
        <div  className="posts-container" >
      {posts.map(post => {
            return <Post key={post._id} post={post}/>;
          })}
          <button onClick={getNextPage} className="button load-more-button">Load More</button>
          </div>
        </Suspense>
      ) : (
        <h1>No Posts</h1>
      )}
      </>
  );
};
export default PostsContainer;
