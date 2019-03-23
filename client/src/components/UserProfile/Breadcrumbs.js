import React from 'react'
import BreadCrumb from './BreadCrumb'
const BreadCrumbs= props => {
    return (
        <ul className="breadcrumbs">
        <BreadCrumb path={'/user/posts'} />
        <BreadCrumb path={'/user/comments'} />
        <BreadCrumb path={'/user/communities'} />
        <BreadCrumb path={'/user/upvoted'} />
        <BreadCrumb path={'/user/downvoted'} />
        <BreadCrumb path={'/user/saved'} />
        </ul>
    )
}
export default BreadCrumbs