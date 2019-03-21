import React from 'react'
const Comment= props => {
    const {comment} = props
    const {content,author,upvotes,downvotes,creationDate} = comment
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
        </div>
    )
}
export default Comment