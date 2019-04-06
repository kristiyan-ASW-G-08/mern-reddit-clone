import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PostBar from '../../PostBar/PostBar';
import VotesContainer from '../../VotesContainer/VotesContainer';
import PropTypes from 'prop-types';
import postType from '../../PropTypes/postType'
import getHumanReadableDate from '../../../util/getHumanReadableDate'
const Post = ({ post, deletePostElement }) => {
  const { title, author, comments, communityName ,creationDate} = post;
  const date = getHumanReadableDate(creationDate)
  console.log(post)
  return (
    <div className="post">
      
      <div className="post-body">
        <div className="post-links">
          <Link to={`/community/${communityName}`} className="post-community">
            c/{communityName}
          </Link>
          <Link to={`/community/${communityName}`} className="post-author">
            Posted by u/{author}
          </Link>
          <p className="post-date"><span dangerouslySetInnerHTML={{__html: '&bull;'}}></span> {date}</p>
        </div>
        <Link
            to={{ pathname: `/post/${post._id}` }}
            className="post-full-link"
          >
            <h3 className="post-title">{title}</h3>
            {post.imageUrl ? <img className="post-image" src={`http://localhost:8080/${post.imageUrl}`}/>: '' }
          </Link>
        
      </div>
      <VotesContainer post={post}/>
      <PostBar post={post} deletePostElement={deletePostElement} />
    </div>
  );
};

Post.propTypes = {
  post:postType.isRequired,
  deletePostElement: PropTypes.func.isRequired
};

export default Post;
