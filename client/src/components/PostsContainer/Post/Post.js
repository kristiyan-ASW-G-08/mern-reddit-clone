import React,{useContext} from 'react';
import {Link} from 'react-router-dom'
import PostBar from '../../PostBar/PostBar'
import VotesContainer from '../../VotesContainer/VotesContainer'
import useAuthContext from '../../../hooks/useAuthContext/useAuthContext'
const Post = props => {
  const {isAuth,userId,token}  = useAuthContext()
  const { post,community,deletePostElement } = props;
  const {title,author,comments,communityName} = post
  console.log(isAuth,userId,token)
  return (
    <div  className="post">
    <VotesContainer post={post} />
    <div className="post-body">
    <div className="post-links">
    <Link to={`/community/${communityName}`} className="post-community">c/{communityName}</Link>
    <Link to={`/community/${communityName}`} className="post-author">c/{author}</Link>
    <Link  to={{pathname:`/post/${post._id}`, community}} className="post-content">
    <h3 className="post-title">{title}</h3>
    </Link>
    </div>
    <PostBar post={post} token={token} userId={userId} deletePostElement={deletePostElement} isAuth={isAuth} />
    </div>
    </div>
  );
};
export default Post;
