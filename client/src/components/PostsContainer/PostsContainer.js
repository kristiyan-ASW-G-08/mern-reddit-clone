import React, { useState, useEffect } from 'react';
import getPosts from './getPosts';
import Post from '../Post/Post';
const PostsContainer = props => {
  const [posts, setPosts] = useState([]);
  const { communityId } = props;
  useEffect(() => {
    getPosts(communityId).then(data => {
      console.log(data);
      setPosts(data.posts);
    });
  }, []);
  let content = 'No posts';
  if (posts.length > 0) {
    content = posts.map(post => {
      return <Post key={post._id} post={post} />;
    });
  }
  return <div className='posts-container'>{content}</div>;
};
export default PostsContainer;
