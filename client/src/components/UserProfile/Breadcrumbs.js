import React from 'react'
import BreadCrumb from './BreadCrumb'
const BreadCrumbs= props => {
    return (
        <ul className="breadcrumbs">
        <BreadCrumb path={'/user/posts'} content={'Posts'}/>
        <BreadCrumb path={'/user/comments'}  content={'Comments'}/>
        <BreadCrumb path={'/user/communities'} content={'Communities'}/>
        <BreadCrumb path={'/user/upvoted'} content={'Upvoted'}/>
        <BreadCrumb path={'/user/downvoted'} content={'Downvoted'}/>
        <BreadCrumb path={'/user/saved'} content={'Saved'}/>
        </ul>
    )
}
export default BreadCrumbs