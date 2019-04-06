import React, { useState, useEffect, lazy, Suspense } from 'react';
import getData from '../../../util/getData';
import PostsContainer from '../../PostsContainer/PostsContainer';
import PropTypes ,{ string,shape}from 'prop-types';
const CommunityPosts = ({ communityName }) => {
  const [posts, setPosts] = useState(false);
  const [page, setPage] = useState(1);
  const getNextPage = async () => {
    await setPage(page + 1);
    const apiUrl = `http://localhost:8080/community/posts/${communityName}?page=${page +
      1}`;
    const responseData = await getData(apiUrl);
    if (responseData.posts) {
      setPosts(posts.concat(responseData.posts));
    }
  };
  useEffect(() => {
    const apiUrl = `http://localhost:8080/community/posts/${communityName}?page=${page}`;
    getData(apiUrl).then(data => {
      if (data.posts) {
        setPosts(data.posts);
      }
    });
  }, []);

  return (
    <PostsContainer
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
