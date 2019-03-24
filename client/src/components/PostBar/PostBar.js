import React,{useState,useContext,useEffect} from 'react'
import {withRouter,Link} from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import postData from '../../util/postData'
import deleteData from '../../util/deleteData'
import { AuthContextData } from '../../AuthContext/AuthContext';
import {
  faShare,faCommentAlt, faBookmark,faTrashAlt,faPen,faCopy
} from '@fortawesome/free-solid-svg-icons';
library.add(faShare,faCommentAlt,faBookmark,faTrashAlt,faPen,faCopy);

const PostBar= props => {
    const { authState, updateUserDataReducer } = useContext(AuthContextData);
    const [saved,setSaved] = useState(false)
    const {isAuth,userId,token,post,deletePostElement} = props
    const {comments,authorId,communityName,_id} = post
    const postId = _id
    useEffect(() => {
        if(isAuth){
            const {userData} = authState
        const savedCheck = userData.saved.find(savedPost => savedPost === post._id)
        setSaved(savedCheck)
        }
     },[])
    const deleteHandler = async () => {
        const apiUrl = `http://localhost:8080/delete-post/${postId}`
    const responseData = await deleteData(apiUrl,token)
    if(responseData.msg === 'Post Deleted'){
        if(deletePostElement){
            deletePostElement(postId)
        }else {
            props.history.push(`/community/${communityName}`)
        }
        
    }
    }
    const spamHandler = async () => {
        console.log(props)
        const apiUrl = `http://localhost:8080/report-spam/${postId}`
        const requestBody = {
            communityId:post.community
        }
        console.log(requestBody)
       const responseData =  await postData(apiUrl,requestBody,token)
       console.log(responseData)
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
        <button onClick={spamHandler} className="button post-info-button">
        <FontAwesomeIcon icon="copy" /><span>Spam</span>
        </button>
        </>
    }
    const saveHandler = async () => {
        if(isAuth){
            console.log(postId,userId)
            const apiIrl = `http://localhost:8080/save/${postId}`
            const responseData = await postData(apiIrl,{},token)
            const {userData} = responseData
            if(userData){
                updateUserDataReducer({ authState, newUserData:userData });
                const savedCheck = userData.saved.find(savedPost => savedPost === post._id)
                setSaved(savedCheck)
            }
        }else {
            props.history.push(`/community/login`)
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
        {autorizedContent}
        </div>
    )
}
export default withRouter(PostBar)