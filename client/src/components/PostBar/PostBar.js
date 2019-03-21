import React,{useState} from 'react'
import {withRouter,Link} from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import deletePost from './deletePost';
import { AuthContextData } from '../../AuthContext/AuthContext';
import {
  faShare,faCommentAlt, faBookmark,faTrashAlt,faPen,
} from '@fortawesome/free-solid-svg-icons';
library.add(faShare,faCommentAlt,faBookmark,faTrashAlt,faPen,);

const PostBar= props => {
    const {userId,token,post,deletePostElement} = props
    const {comments,authorId,communityName,_id} = post
    const postId = _id
    const deleteHandler = () => {
        deletePost(postId,token)
        .then(data => {
            if(data.msg === 'Post Deleted'){
                if(deletePostElement){
                    deletePostElement(postId)
                }else {
                    props.history.push(`/community/${communityName}`)
                }
                
            }
        })
    }

    let autorizedContent = ''
    if(authorId === userId){
        autorizedContent = 
        <>
         <button onClick={deleteHandler} className="button post-info-button">
        <FontAwesomeIcon icon="trash-alt" /><span>Delete</span>
        </button>
        
        <Link to={{pathname:`/edit-post/${postId}`, post}}>
        <button className="button post-info-button">
        <FontAwesomeIcon icon="pen" /><span>Edit</span>
        </button>
        </Link>
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