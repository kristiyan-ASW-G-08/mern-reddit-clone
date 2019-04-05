import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PostBar from '../../PostBar/PostBar';
import VotesContainer from '../../VotesContainer/VotesContainer';
import PropTypes from 'prop-types';
import postType from '../../PropTypes/postType'
const Post = ({ post, deletePostElement }) => {
  const { title, author, comments, communityName } = post;
  console.log(post)
  return (
    <div className="post">
      <VotesContainer post={post} />
      <div className="post-body">
        <div className="post-links">
          <Link to={`/community/${communityName}`} className="post-community">
            c/{communityName}
          </Link>
          <Link to={`/community/${communityName}`} className="post-author">
            u/{author}
          </Link>
          <Link
            to={{ pathname: `/post/${post._id}` }}
            className="post-content"
          >
          <div className={`post-content-container ${post.imageUrl ? 'has-image' : ''}`}>
            <h3 className="post-title">{title}</h3>
            {post.imageUrl ? <img className="post-image" src={`http://localhost:8080/${post.imageUrl}`}/>: '' }
            </div>
          </Link>
        </div>
        <PostBar post={post} deletePostElement={deletePostElement} />
      </div>
    </div>
  );
};

Post.propTypes = {
  post:postType.isRequired,
  deletePostElement: PropTypes.func.isRequired
};

export default Post;
