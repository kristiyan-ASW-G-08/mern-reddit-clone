import React,{useState} from 'react'
import {withRouter} from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import deletePost from './deletePost';
import { AuthContextData } from '../../AuthContext/AuthContext';
import {
  faShare,faCommentAlt, faBookmark,faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
library.add(faShare,faCommentAlt,faBookmark,faTrashAlt);

const PostBar= props => {
    const {comments,authorId,userId,token,communityName,postId} = props
    const deleteHandler = () => {
        console.log('handler')
        console.log(postId)
        deletePost(postId,token)
        .then(data => {
            console.log(data)
            if(data.msg === 'Post Deleted'){
                props.history.push(`/community/${communityName}`)
            }
        })
    }
    let autorizedContent = ''
    if(authorId === userId){
        console.log('authorized')
        autorizedContent = 
        <>
         <button onClick={deleteHandler} className="button post-info-button">
        <FontAwesomeIcon icon="trash-alt" /><span>Delete</span>
        </button>
        </>
    }
    
    return (
        <div className="post-info">
        <button className="button post-info-button">
        <FontAwesomeIcon icon="share" /><span>Share</span>
        </button>
        <button className="button post-info-button">
        <FontAwesomeIcon icon="comment-alt" /><span>{comments}</span>
        </button>
        <button className="button post-info-button">
        <FontAwesomeIcon icon="bookmark" /><span>Save</span>
        </button>
        {autorizedContent}
        </div>
    )
}
export default withRouter(PostBar)