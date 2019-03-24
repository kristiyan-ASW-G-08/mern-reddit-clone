import React, { useState, useEffect, lazy, Suspense } from 'react';
import Loader from '../Loader';
import getData from '../../util/getData';
import PostsContainer from '../PostsContainer/PostsContainer'
const Posts = lazy(() => import('../PostsContainer/Posts'));
const CommunityPosts = ({communityId}) => {
  const [posts, setPosts] = useState(false);
  const [page, setPage] = useState(1);
  const getNextPage = async () => {
    await setPage(page + 1);
     const apiUrl = `http://localhost:8080/posts/${communityId}?page=${page + 1}`;
    const responseData = await getData(apiUrl);
    if (responseData.posts) {
      setPosts(posts.concat(responseData.posts));
    }
  };
  useEffect(() => {
    const apiUrl = `http://localhost:8080/posts/${communityId}?page=${page}`;
    getData(apiUrl).then(data => {
      if (data.posts) {
        setPosts(data.posts);
       
      }
    });
  }, []);

  return (
    <PostsContainer posts={posts} getNextPage={getNextPage} setPosts={setPosts} />
  );
};
export default CommunityPosts;



