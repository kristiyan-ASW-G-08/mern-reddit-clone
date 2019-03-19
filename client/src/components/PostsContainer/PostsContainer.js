import React, { useState, useEffect, lazy, Suspense } from 'react';
import Loader from '../Loader';
import getPosts from './getPosts';
const Post = lazy(() => import('../Post/Post'));
const PostsContainer = props => {
  const [posts, setPosts] = useState(false);
  const { communityId } = props;
  useEffect(() => {
    getPosts(communityId).then(data => {
      console.log(data);
      setPosts(data.posts);
    });
  }, []);

  return (
    <div className="posts-container">
      {posts ? (
        <Suspense fallback={<Loader />}>
          {posts.map(post => {
            return <Post key={post._id} post={post}/>;
          })}
        </Suspense>
      ) : (
        <h1>No Posts</h1>
      )}
    </div>
  );
};
export default PostsContainer;
