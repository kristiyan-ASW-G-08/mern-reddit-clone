import React  from 'react'
import PostBar from '../../PostBar/PostBar'
import VotesContainer from '../../VotesContainer/VotesContainer'
const PostFull= props => {
    const {post,userId,token} = props
    return (
        <div className="post-container">
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
        </div>
  )
}
export default PostFull

