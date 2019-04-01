import React,{useState,useContext,useEffect} from 'react'
import {withRouter,Link} from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import postData from '../../util/postData'
import deleteData from '../../util/deleteData'
import useAuthContext from '../../hooks/useAuthContext/useAuthContext'
import {string,func,shape} from 'prop-types'
import postType from '../PropTypes/postType'
import {
  faShare,faCommentAlt, faBookmark,faTrashAlt,faPen,faCopy
} from '@fortawesome/free-solid-svg-icons';
library.add(faShare,faCommentAlt,faBookmark,faTrashAlt,faPen,faCopy);

const PostBar= ({post,deletePostElement,history}) => {
    const { isAuth,userId,token,userData, updateUserDataReducer } = useAuthContext()
    const [saved,setSaved] = useState(false)
    const {comments,authorId,communityName,_id} = post
    const postId = _id
    useEffect(() => {
        if(isAuth){
        const savedCheck = userData.saved.find(savedPost => savedPost === post._id)
        setSaved(savedCheck)
        }
     },[])
    const deleteHandler = async () => {
        const apiUrl = `http://localhost:8080/post/delete/${postId}`
    const responseData = await deleteData(apiUrl,token)
    if(responseData.msg === 'Post Deleted'){
        if(deletePostElement){
            deletePostElement(postId)
        }else {
            history.push(`/community/${communityName}`)
        }
        
    }
    }
    const spamHandler = async () => {
        const apiUrl = `http://localhost:8080/community/report/${postId}`
        const requestBody = {
            communityId:post.community
        }
       const responseData =  await postData(apiUrl,requestBody,token)
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
    const saveHandler = async () => {
        if(isAuth){
            const apiIrl = `http://localhost:8080/user/save/${postId}`
            const responseData = await postData(apiIrl,{},token)
            const {userData} = responseData
            if(userData){
                const authState = {
                    isAuth,
                    token,
                    userId,
                    userData
                }
                updateUserDataReducer({ authState, newUserData:userData });
                const savedCheck = userData.saved.find(savedPost => savedPost === post._id)
                setSaved(savedCheck)
            }
        }else {
            history.push(`/community/login`)
        }
    }
    return (
        <div className="post-info">
        <button className="button post-info-button">
        <FontAwesomeIcon icon="share" /><span>Share</span>
        </button>
        <button className="button post-info-button">
        <FontAwesomeIcon icon="comment-alt" /><span>{comments}</span>
        </button>
        <button onClick={saveHandler} className={`button post-info-button ${saved ? 'saved' : ''} `}>
        <FontAwesomeIcon icon="bookmark" /><span>Save</span>
        </button>
        <button onClick={spamHandler} className="button post-info-button">
        <FontAwesomeIcon icon="copy" /><span>Spam</span>
        </button>
        {autorizedContent}
        </div>
    )
}

PostBar.propTypes = {
    deletePostElement:func,
    post:postType.isRequired,
    history: shape({
     push:func.isRequired,
   })
    };
export default withRouter(PostBar)