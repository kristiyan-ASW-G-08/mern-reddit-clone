import React from 'react';
import {Link} from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContextData } from '../../AuthContext/AuthContext';
import {
  faShare,faCommentAlt, faBookmark
} from '@fortawesome/free-solid-svg-icons';
library.add(faShare,faCommentAlt,faBookmark);
const Post = props => {
  const { post } = props;
  const {title,author,comments} = post
  return (
    
    <div  className="post">
    <Link to={`/post/${post._id}`} className="post-link">
    <h4 className="post-author">Posted by u/{author}</h4>
    <h3 className="post-title">{title}</h3>
    </Link>
    <div className="post-info">
    <button className="button post-info-button">
    <FontAwesomeIcon icon="share" /><span>Share</span>
    </button>
    <button className="button post-info-button">
    <FontAwesomeIcon icon="comment-alt" /><span>0</span>
    </button>
    <button className="button post-info-button">
    <FontAwesomeIcon icon="bookmark" /><span>Save</span>
    </button>
    </div>
    </div>
  );
};
export default Post;
