import React,{useContext,useState,useEffect} from 'react'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {withRouter} from 'react-router-dom'
import postData from '../../util/postData'
import useAuthContext from '../../hooks/useAuthContext/useAuthContext'
import PropTypes ,{ string,shape,func}from 'prop-types';
import postType from '../PropTypes/postType'
import {
  faCaretUp,faCaretDown
} from '@fortawesome/free-solid-svg-icons';
library.add( faCaretUp,faCaretDown);
const VotesContainer = ({post,history}) => {
    const [totalVotes,setTotalVotes] = useState(0) 
    const [upvoted,setUpvoted] = useState(false)
    const [downvoted,setDownvoted] = useState(false)
    const {token,isAuth,userId,userData,updateUserDataReducer} = useAuthContext()
    const {upvotes,downvotes} = post
    useEffect(() => {
        setTotalVotes(upvotes - downvotes)
        if(userData){
            if(userData.upvoted.includes(post._id)){
                setUpvoted(true)
            }
            if(userData.downvoted.includes(post._id)){
                setDownvoted(true)
            }
        }
        
    },[])
    const voteHandler = async type => {
        if(isAuth){
            const postId = post._id
          const apiUrl = type === 'upvote' ? `http://localhost:8080/post/upvote/${postId}` : `http://localhost:8080/post/downvote/${postId}`
            const responseData = await postData(apiUrl,{},token)
            const authState = {isAuth,userData,token,userId}
                setTotalVotes(responseData.postUpvotes - responseData.postDownvotes)
                updateUserDataReducer({ authState, newUserData: responseData.userData });
                if(responseData.userData.upvoted.includes(post._id)){
                    setUpvoted(true)
                    setDownvoted(false)
                }
                if(responseData.userData.downvoted.includes(post._id)){
                    setDownvoted(true)
                    setUpvoted(false)
                }
        }else{
            history.push(`/login`)
        }
      
      }

    return (
        <div className="votes-container">
         <button onClick={(() => voteHandler('upvote'))} className={`button ${upvoted ? 'upvoted' : ''}`}>
        <FontAwesomeIcon icon="caret-up" />
        </button>
        <span className={`votes-container-number ${upvoted ? 'upvoted' : ''} ${downvoted ? 'downvoted' : ''}`}>{totalVotes}</span>
        <button onClick={(() => voteHandler('downvote'))} className={`button ${downvoted ? 'downvoted' : ''}`}>
        <FontAwesomeIcon icon="caret-down" />
        </button>
        </div>
    )
}
VotesContainer.propTypes = {
   post:postType.isRequired,
   history: shape({
    push:func.isRequired,
  })
   };
export default withRouter(VotesContainer)