import React, { Fragment, lazy } from 'react';
import Post from '../Post/Post';
import PropTypes from 'prop-types';
import postsArrType from '../../PropTypes/postsArrType'
const Posts = ({ posts, deletePostElement }) => {
  return (
    <>
      <div className="posts" data-testid="posts">
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

Posts.propTypes = {
  posts: postsArrType.isRequired,
  deletePostElement: PropTypes.func.isRequired
};
export default Posts;
