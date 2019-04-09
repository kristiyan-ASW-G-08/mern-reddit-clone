import React from 'react'
import {Link} from 'react-router-dom'
import getHumanReadableDate from '../../../util/getHumanReadableDate'
const Report= ({report}) => {
    const {date,postId} = report;
    const humanReadableDate = getHumanReadableDate(date)
    return (
        <div className="report">
        <p className="report-date">Reported on <time dateTime={date}>{humanReadableDate}</time>.</p>
        
        <div className="buttons-container">
        <button className="button"><Link to={`/post/${postId}`}>Visit Post</Link></button>
        <button className="button">Remove Post</button>
        <button className="button">Dismiss Report</button>
        <button className="button">Ban User</button>
        </div>
        </div>
    )
}
export default Report