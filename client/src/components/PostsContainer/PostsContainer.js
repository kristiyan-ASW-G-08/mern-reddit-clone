import React, { Suspense, lazy } from 'react';
import Loader from '../Loader';
import PropTypes from 'prop-types';
import postsArrType from '../PropTypes/postsArrType';
const Posts = lazy(() => import('./Posts/Posts'));
const PostsContainer = ({ posts, getNextPage, setPosts ,postsCount}) => {
  console.log(posts,postsCount)
  const deletePostElement = postId => {
    const editedPosts = posts.filter(post => post._id !== postId);
    setPosts(editedPosts);
  };
  return (
    <>
      {posts ? (
        <Suspense fallback={<Loader />}>
          <div className="posts-container" data-testid="posts-container">
            <Posts posts={posts} deletePostElement={deletePostElement} />
            {
              postsCount > 0 ? <button onClick={getNextPage} className="button load-more-button">
              Load More
            </button> : ''
            }
            
          </div>
        </Suspense>
      ) : (
        <h1>No Posts</h1>
      )}
    </>
  );
};
PostsContainer.propTypes = {
  posts: postsArrType.isRequired,
  setPosts: PropTypes.func.isRequired,
  getNextPage: PropTypes.func.isRequired,
  postsCount:PropTypes.number.isRequired
};
export default PostsContainer;
