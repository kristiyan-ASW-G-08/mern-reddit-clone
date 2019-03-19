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
    const {post} = props
    const {upvotes,downvotes} = post
    const [totalVotes,setTotalVotes] = useState(0)
    const [isAuth,setAuth] = useState(false)
    const [token,setToken] = useState(false)
    useEffect(() => {
        setTotalVotes(upvotes - downvotes)
        console.log(authState)
        if(authState.authState){
            const {token,isAuth} = authState.authState
            console.log(isAuth)
            setAuth(isAuth)
            setToken(token)
        }
    },[])

    const upvoteHandler = () => {
        console.log('upvote')
        console.log(isAuth)
        if(isAuth){
            console.log('auth')
            upvote(post.postId,token)
            .then(data => {
                console.log(data)
            })
        }
      
    }
    const downvoteHandler = () => {

    }
    return (
        <div className="post-votes-container">
         <button onClick={upvoteHandler} className="button ">
        <FontAwesomeIcon icon="caret-up" />
        </button>
        <span className="post-votes-container-number">{totalVotes}</span>
        <button className="button ">
        <FontAwesomeIcon icon="caret-down" />
        </button>
        </div>
    )
}
export default VotesContainer 