import React,{useState,useContext} from 'react'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuthContext from '../../../hooks/useAuthContext/useAuthContext'
import {
  faShare,faCommentAlt, faBookmark,faTrashAlt,faPen,
} from '@fortawesome/free-solid-svg-icons';
import deleteData from '../../../util/deleteData'
library.add(faShare,faCommentAlt,faBookmark,faTrashAlt,faPen,);
const CommentBar= ({deleteCommentElement,toggle,setEditComment,comment,on}) => {
    const {userId,token} = useAuthContext()
    const {authorId,comments,_id} = comment
    const deleteHandler = async () => {
        const apiUrl = `http://localhost:8080/comment/delete/${_id}`
        const data = await deleteData(apiUrl,token)
        if(data.msg === 'deleated'){
            deleteCommentElement(_id)
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
         <button onClick={deleteHandler} className="button post-info-button" data-testid="delete-button">
        <FontAwesomeIcon icon="trash-alt" /><span>Delete</span>
        </button>
        <button onClick={editHandler} className="button post-info-button" data-testid="edit-button">
        <FontAwesomeIcon icon="pen" /><span>Edit</span>
        </button>
        </>
    }
    
    return (
        <div>
            <div className="post-info">
        <button className="button post-info-button" data-testid="share-button">
        <FontAwesomeIcon icon="share" /><span>Share</span>
        </button>
        <button className="button post-info-button">
        <FontAwesomeIcon icon="comment-alt" /><span>{comments}</span>
        </button>
        <button className="button post-info-button" data-testid="save-button">
        <FontAwesomeIcon icon="bookmark" /><span>Save</span>
        </button>
        {autorizedContent}
        </div>
        </div>
    )
}
export default CommentBar