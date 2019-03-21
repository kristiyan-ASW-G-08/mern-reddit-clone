import React from 'react'
import CommentBar from './CommentBar'
const Comment= props => {
    const {comment} = props
    const {content,author,upvotes,downvotes,creationDate,comments} = comment
    console.log(creationDate)
    console.log(comment)
    const dateObject = new Date(Date.parse(creationDate));
  const dateReadable = dateObject.toDateString();
  console.log(dateReadable)
    return (
        <div className="comment">
        <div className="comment-details">
        <p className="comment-author">{author}</p>
            <p className="comment-date">{dateReadable}</p>
        </div>
            <h5 className="comment-content">{content}</h5>
            <CommentBar authorId={author._id} comments={comments} />
        </div>
    )
}
export default Comment