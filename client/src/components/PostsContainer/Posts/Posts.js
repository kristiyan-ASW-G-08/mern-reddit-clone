import React, { Fragment,lazy } from 'react';
import Post from '../Post/Post'
const Posts = ({ posts,deletePostElement }) => {
  return (
    <>
    <div data-testid="posts" >
      {posts.map(post => {
        return (
          <Post
            key={post._id}
            post={post}
            deletePostElement={deletePostElement}
          />
        );
      })}
      </div>
    </>
  );
};
export default Posts;
