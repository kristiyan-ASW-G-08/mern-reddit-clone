import React,{useState,useContext} from 'react'
import deleteComment from './deleteComment'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContextData } from '../../../../AuthContext/AuthContext';
import {
  faShare,faCommentAlt, faBookmark,faTrashAlt,faPen,
} from '@fortawesome/free-solid-svg-icons';
library.add(faShare,faCommentAlt,faBookmark,faTrashAlt,faPen,);
const CommentBar= props => {
    const {authState} = useContext(AuthContextData)
    const {userId,token} = authState
    const {authorId,comments,deleteCommentElement,commentId,toggle,setEditComment,comment,on} = props
    const deleteHandler = async () => {
        console.log(authState)
        const data = await deleteComment(commentId,token)
        if(data.msg === 'Comment Deleted'){
            deleteCommentElement(commentId)
        }
    }
    const editHandler = () => {
        if(on){

        }else {
            toggle()
            setEditComment(comment)
        }
    }
    let autorizedContent = ''
     if(authorId === userId){
        autorizedContent = 
        <>
         <button onClick={deleteHandler} className="button post-info-button">
        <FontAwesomeIcon icon="trash-alt" /><span>Delete</span>
        </button>
        <button onClick={editHandler} className="button post-info-button">
        <FontAwesomeIcon icon="pen" /><span>Edit</span>
        </button>
        </>
    }
    
    return (
        <div>
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
        </div>
    )
}
export default CommentBar