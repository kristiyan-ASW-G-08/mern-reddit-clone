import React from 'react'
import {Link} from 'react-router-dom'
import getHumanReadableDate from '../../../util/getHumanReadableDate'
const Report= ({report,deletePost}) => {
    const {date,postId,_id} = report;
    const humanReadableDate = getHumanReadableDate(date)
    return (
        <div className="report">
        <p className="report-date">Reported on <time dateTime={date}>{humanReadableDate}</time>.</p>
        <div className="buttons-container buttons-container-grid">
        <button className="button"><Link to={`/post/${postId}`}>Visit Post</Link></button>
        <button onClick={() => {deletePost(_id)}} className="button">Delete Post</button>
        <button className="button">Dismiss Report</button>
        <button className="button">Ban User</button>
        </div>
        </div>
    )
}
export default Report