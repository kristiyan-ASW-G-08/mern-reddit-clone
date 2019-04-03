import React,{useState,useContext} from 'react'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuthContext from '../../../hooks/useAuthContext/useAuthContext'
import {
  faShare,faCommentAlt, faBookmark,faTrashAlt,faPen,
} from '@fortawesome/free-solid-svg-icons';
import deleteData from '../../../util/deleteData'
import PropTypes from 'prop-types';
import commentType from '../../PropTypes/commentType'
library.add(faShare,faCommentAlt,faBookmark,faTrashAlt,faPen,);
const CommentBar= ({deleteCommentElement,toggle,setEditComment,comment,on}) => {
    const {userId,token} = useAuthContext()
    const {authorId,comments,_id} = comment
    const deleteHandler = async () => {
        const apiUrl = `http://localhost:8080/comment/delete/${_id}`
        const data = await deleteData(apiUrl,token)
        if(data.msg === 'deleted'){
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
    let authorizedContent = ''
     if(authorId === userId){
        authorizedContent = 
        <>
         <button onClick={deleteHandler} className="button postbar-button" data-testid="delete-button">
        <FontAwesomeIcon icon="trash-alt" /><span>Delete</span>
        </button>
        <button onClick={editHandler} className="button postbar-button" data-testid={`edit-button-${_id}`}>
        <FontAwesomeIcon icon="pen" /><span>Edit</span>
        </button>
        </>
    }
    return (
        <div>
        <div className="postbar">
        <button className="button postbar-button">
        <FontAwesomeIcon icon="comment-alt" /><span>{comments}</span>
        </button>
        <button className="button postbar-button" data-testid="save-button">
        <FontAwesomeIcon icon="bookmark" /><span>Save</span>
        </button>
        {authorizedContent}
        </div>
        </div>
    )
}

CommentBar.propTypes = {
    comment:commentType.isRequired,
    deleteCommentElement: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired,
    setEditComment: PropTypes.func.isRequired,
    on: PropTypes.bool.isRequired
  };
export default CommentBar