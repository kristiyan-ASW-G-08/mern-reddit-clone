import React, { useState, useEffect, lazy, Suspense } from 'react';
import Loader from '../Loader';
import getData from '../../util/getData';
import PostsContainer from '../PostsContainer/PostsContainer'
const HomePage = ({communityId}) => {
  const [posts, setPosts] = useState(false);
  const [page, setPage] = useState(1);
  const [postsCount, setPostsCount] = useState(0);
  const getNextPage = async () => {
    await setPage(page + 1);
     const apiUrl = `http://localhost:8080/post/posts?page=${page + 1}`;
    const responseData = await getData(apiUrl);
    if (responseData.posts) {
      setPosts(posts.concat(responseData.posts));
      setPostsCount(responseData.postsCount)
    }
  };
  useEffect(() => {
    const apiUrl = `http://localhost:8080/post/posts?page=${page}`;
    getData(apiUrl).then(data => {
      if (data.posts) {
        setPosts(data.posts);
        setPostsCount(data.postsCount)
       
      }
    });
  }, []);

  return (
    <PostsContainer posts={posts} getNextPage={getNextPage} setPosts={setPosts} postsCount={postsCount} />
  );
};
export default HomePage;



