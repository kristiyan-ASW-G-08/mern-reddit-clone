import React,{useState,useContext,useEffect} from 'react'
import {withRouter,Link} from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import postData from '../../util/postData'
import deleteData from '../../util/deleteData'
import useAuthContext from '../../hooks/useAuthContext/useAuthContext'
import useModalContext from '../../hooks/useModalContext/useModalContext'
import {string,func,shape} from 'prop-types'
import postType from '../PropTypes/postType'
import ComponentName   from './testEl';
import {
  faShare,faCommentAlt, faBookmark,faTrashAlt,faPen,faCopy,faLink
} from '@fortawesome/free-solid-svg-icons';
library.add(faShare,faCommentAlt,faBookmark,faTrashAlt,faPen,faCopy,faLink);

const PostBar= ({post,deletePostElement,history}) => {
    const { isAuth,userId,token,userData, updateUserDataReducer } = useAuthContext()
    const {toggleModalReducer} = useModalContext()
    const [saved,setSaved] = useState(false)
    const [copyButtonActive,setCopyButtonActive] = useState(false)
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
    const reportHandler = async () => {
       toggleModalReducer({on:true,message:null,Component: ComponentName })
        console.log(post)
    }
    let authorizedContent = ''
    if(authorId === userId){
        authorizedContent = 
        <>
         <button onClick={deleteHandler} className="button postbar-button">
        <FontAwesomeIcon icon="trash-alt" /><span>Delete</span>
        </button>
        <Link to={{pathname:`/edit-post/${postId}`, post}}>
        <button className="button postbar-button">
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
                toggleModalReducer({on:true,message:`Post ${savedCheck ? 'saved' : 'unsaved'} !`})
                setSaved(savedCheck)
            }
        }else {
            history.push({pathname: '/login',
            state: { message:"Login to save!" }})
        }
    }

    const copyUrlHandler = async () => {
        const url = `${window.location.origin}/post/${_id}`
        navigator.clipboard.writeText(url)
        .then(writeData => {
            setCopyButtonActive(false)
            toggleModalReducer({on:true,message:'CopiedLink!'})
        })

    }
    return (
        <div className="postbar">
        <ul className="postbar-button-with-options">
        <button className="button postbar-button" onClick={() => setCopyButtonActive(!copyButtonActive)}>
        <FontAwesomeIcon icon="share" /><span>Share</span>
        </button>
        <ul className={`postbar-button-options ${copyButtonActive ?  'active' : ''}`}>
            <li><button className="button postbar-button" onClick={copyUrlHandler}><FontAwesomeIcon icon="link" />Copy Link</button></li>
        </ul>
        </ul>
       
        <button className="button postbar-button">
        <FontAwesomeIcon icon="comment-alt" /><span>{comments}</span>
        </button>
        <button onClick={saveHandler} className={`button postbar-button ${saved ? 'saved' : ''} `}>
        <FontAwesomeIcon icon="bookmark" /><span>Save</span>
        </button>
        <button onClick={reportHandler} className="button postbar-button">
        <FontAwesomeIcon icon="copy" /><span>Report</span>
        </button>
        {authorizedContent}
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