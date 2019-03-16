import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContextData } from '../../AuthContext/AuthContext';
import {
  faShare
} from '@fortawesome/free-solid-svg-icons';
library.add(faShare);
const Post = props => {
  const { post } = props;
  const {title,author} = post
  return (
    <div  className="post">
    <h4 className="post-author">Posted by u/{author}</h4>
    <h3 className="post-title">{title}</h3>
    <div className="post-info">
    <button className="button post-info-button">
    <FontAwesomeIcon icon="share" />Share
    </button>
    <button className="button post-info-button">
    <FontAwesomeIcon icon="share" />Share
    </button>
    <button className="button post-info-button">
    <FontAwesomeIcon icon="share" />Share
    </button>
    <button className="button post-info-button">
    <FontAwesomeIcon icon="share" />Share
    </button>
    </div>
    </div>
  );
};
export default Post;
