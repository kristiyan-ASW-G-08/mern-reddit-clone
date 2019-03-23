import React, { useState, useEffect, lazy, Suspense } from 'react';
import Loader from '../Loader';
import getData from '../../util/getData';
const Post = lazy(() => import('../Post/Post'));
const PostsContainer = props => {
  const [posts, setPosts] = useState(false);
  const [page, setPage] = useState(1);
  const { communityId } = props;
  const apiUrl = `http://localhost:8080/posts/${communityId}?page=${page}`;
  useEffect(() => {
    getData(apiUrl).then(data => {
      if (data.posts) {
        setPosts(data.posts);
      }
    });
  }, []);

  const getNextPage = async () => {
    setPage(page + 1);
    const responseData = await getData(apiUrl);
    if (responseData.posts) {
      setPosts(posts.concat(responseData.posts));
    }
  };
  const deletePostElement = postId => {
    const editedPosts = posts.filter(post => post._id !== postId);
    setPosts(editedPosts);
  };
  return (
    <>
      {posts ? (
        <Suspense fallback={<Loader />}>
          <div className="posts-container">
            {posts.map(post => {
              return (
                <Post
                  key={post._id}
                  post={post}
                  deletePostElement={deletePostElement}
                />
              );
            })}
            <button onClick={getNextPage} className="button load-more-button">
              Load More
            </button>
          </div>
        </Suspense>
      ) : (
        <h1>No Posts</h1>
      )}
    </>
  );
};
export default PostsContainer;
