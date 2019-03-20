import React ,{useContext,useEffect,useState,Fragment} from 'react'
import {AuthContextData} from '../../AuthContext/AuthContext'
import getPost from './getPost';
import PostBar from '../PostBar/PostBar'
import VotesContainer from '../VotesContainer/VotesContainer'
const PostFull= props => {
    const authState = useContext(AuthContextData)
    const [post, setPost] = useState(null)
    const {isAuth,userId,token}  = authState.authState
    const {postId} = props.match.params
    console.log(props)
    useEffect(() => {
        getPost(postId)
        .then(data => {
            if(data.post){
                console.log(data.post)
                setPost(data.post)
            }
        })
    },[])
    let content = 'No posts';
    if (post) {
      content = <>
      <VotesContainer post={post}/>
      <div className="post-body">
      <div className="post-description">
      <div className="post-source-wrapper">
      <h2 className="post-community">c/{post.communityName}</h2>
      <h3 className="post-author">Posted by u/{post.author}</h3>
      </div>
      <h1 className="post-title">
      {post.title}
      </h1>
      <p className="post-content">
      {post.content}
      </p>
      <PostBar   userId={userId} token={token}  post={post} />
      </div>
      </div>
      </>
    }
    return (
        <div className="post-full">
            {content}
        </div>
    )
}
export default PostFull