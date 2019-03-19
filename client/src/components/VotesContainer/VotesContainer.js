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
    const {authState} = useContext(AuthContextData)
    // const {token,isAuth} = authState.authState
    let token
    let isAuth;
    if(authState.isAuth){
         token = authState.token
         isAuth  = authState.isAuth
    }
    const {post} = props
    const {upvotes,downvotes} = post
    const [totalVotes,setTotalVotes] = useState(0)
    useEffect(() => {
        setTotalVotes(upvotes - downvotes)

    },[])

    const upvoteHandler = () => {
        console.log('upvote')
        console.log(isAuth)
        if(isAuth){
            console.log('auth')
            upvote(post._id,token)
            .then(data => {
                console.log(data)
            })
        }
      
    }
    const downvoteHandler = () => {
        console.log('downvote')
        console.log(isAuth)
        if(isAuth){
            console.log('auth')
            downvote(post._id,token)
            .then(data => {
                console.log(data)
            })
        }
    }
    return (
        <div className="post-votes-container">
         <button onClick={upvoteHandler} className="button ">
        <FontAwesomeIcon icon="caret-up" />
        </button>
        <span className="post-votes-container-number">{totalVotes}</span>
        <button onClick={downvoteHandler} className="button ">
        <FontAwesomeIcon icon="caret-down" />
        </button>
        </div>
    )
}
export default VotesContainer 