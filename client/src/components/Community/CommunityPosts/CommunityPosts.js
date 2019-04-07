import React, { useState, useEffect, lazy, Suspense } from 'react';
import getData from '../../../util/getData';
import PostsContainer from '../../PostsContainer/PostsContainer';
import PropTypes ,{ string,shape}from 'prop-types';
const CommunityPosts = ({ communityName }) => {
  const [posts, setPosts] = useState([]);
  const [postsCount, setPostsCount] = useState(0);
  const [page, setPage] = useState(1);
  const getNextPage = async () => {
   setPage(currentPage => currentPage + 1);
   console.log(page)
    const apiUrl = `http://localhost:8080/community/posts/${communityName}?page=${page + 1}`;
    const responseData = await getData(apiUrl);
    if (responseData.posts) {
      setPosts(posts.concat(responseData.posts));
      setPostsCount(responseData.postsCount)
    }
  };
  useEffect(() => {
    const apiUrl = `http://localhost:8080/community/posts/${communityName}?page=${page}`;
    getData(apiUrl).then(data => {
      if (data.posts) {
        setPostsCount(data.postsCount)
        setPosts(data.posts);
      }
    });
  }, []);

  return (
    <PostsContainer
      postsCount={postsCount}
      posts={posts}
      getNextPage={getNextPage}
      setPosts={setPosts}
    />
  );
};

CommunityPosts.propTypes = {
  communityName:string.isRequired
 };
export default CommunityPosts;
