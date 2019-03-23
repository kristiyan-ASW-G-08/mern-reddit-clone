import React, { Fragment,lazy } from 'react';
const Post = lazy(() => import('../Post/Post'));
const Posts = ({ posts,deletePostElement }) => {
  return (
    <>
      {posts.map(post => {
        return (
          <Post
            key={post._id}
            post={post}
            deletePostElement={deletePostElement}
          />
        );
      })}
    </>
  );
};
export default Posts;
