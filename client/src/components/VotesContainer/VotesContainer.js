import React,{useContext,useState,useEffect} from 'react'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContextData } from '../../AuthContext/AuthContext';
import upvote from './upvote';
import downvote from './downvote';
import {
  faCaretUp,faCaretDown
} from '@fortawesome/free-solid-svg-icons';
library.add( faCaretUp,faCaretDown);
const VotesContainer = props => {
    const {authState,updateUserDataReducer} = useContext(AuthContextData)
    let token
    let isAuth;
    if(authState.isAuth){
         token = authState.token
         isAuth  = authState.isAuth
    }
    const {post} = props
    let {upvotes,downvotes} = post

    const [totalVotes,setTotalVotes] = useState(0) 
    const [upvoted,setUpvoted] = useState(false)
    const [downvoted,setDownvoted] = useState(false)
    useEffect(() => {
        setTotalVotes(upvotes - downvotes)
        // if(authState.userData.upvoted.includes(post._id)){
        //     setUpvoted(true)
        // }
        // if(authState.userData.downvoted.includes(post._id)){
        //     setDownvoted(true)
        // }
    },[])

    const upvoteHandler = () => {
        console.log('upvote')
        console.log(isAuth)
        if(isAuth){
            console.log('auth')
            upvote(post._id,token)
            // .then(data => {
            //     upvotes = data.postUpvotes
            //     downvotes = data.postDownvotes
            //     setTotalVotes(upvotes - downvotes)
            //     updateUserDataReducer({ authState, newUserData: data.userData });
            //     console.log(data)
            // })
        }
      
    }
    const downvoteHandler = () => {
        console.log('downvote')
        console.log(isAuth)
        if(isAuth){
            console.log('auth')
            downvote(post._id,token)
            // .then(data => {
            //     console.log(data)
            //     upvotes = data.postUpvotes
            //     downvotes = data.postDownvotes
            //     setTotalVotes(upvotes - downvotes)
            //     updateUserDataReducer({ authState, newUserData: data.userData });
            //     console.log(data.userData)
            // })
        }
    }
    return (
        <div className="post-votes-container">
         <button onClick={upvoteHandler} className={`button ${upvoted ? 'upvoted' : ''}`}>
        <FontAwesomeIcon icon="caret-up" />
        </button>
        {/* <span className={`post-votes-container-number ${upvoted ? 'upvoted' : ''} ${downvoted ? 'downvoted' : ''}`}>{totalVotes}</span> */}
        <button onClick={downvoteHandler} className={`button ${downvoted ? 'downvoted' : ''}`}>
        <FontAwesomeIcon icon="caret-down" />
        </button>
        </div>
    )
}
export default VotesContainer 