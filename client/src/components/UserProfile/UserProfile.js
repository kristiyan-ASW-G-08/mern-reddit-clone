import React from 'react'
import SideDrawer from '../SideDrawer/SideDrawer'
import {withRouter} from 'react-router-dom'
import useToggle from '../../hooks/useToggle/useToggle'
import UserComments from './UserComments';
import UserPosts from './UserPosts';
import UserSaved from './UserSaved';
import UserUpvoted from './UserUpvoted';
import UserDownvoted from './UserDownvoted';
import UserCommunities from './UserCommunities';
const  UserProfile = ({history,match}) => {
  const {on,toggle} = useToggle(false)
  let content;
  let pageTitle
  let sideDrawerListItems = []
  if(match.url){
    const {url} = match
    console.log(url)
    sideDrawerListItems = [
      {
        active: `/user/posts`,
        content: 'Posts',
        element:<UserPosts />
      },
      {
        active: `/user/comments`,
        content: 'Comments',
        element:<UserComments/>
      },
      {
        active: `/user/saved`,
        content: 'Saved',
        element:<UserSaved/>
      },
      {
        active: `/user/upvoted`,
        content: 'Upvoted',
        element:<UserUpvoted/>
      },
      {
        active: `/user/downvoted`,
        content: 'Downvoted',
        element:<UserDownvoted />
      },
      {
        active: `/user/communities`,
        content: 'Communities',
        element:<UserCommunities/>
      }
    ];
    const selectedPage = sideDrawerListItems.find(item => item.active === url)
    content = selectedPage.element
    pageTitle = selectedPage.content
  }
    return (
        <>
        <button onClick={toggle} className="button button-profile">{pageTitle} / More</button>
        <SideDrawer listItems={sideDrawerListItems} on={on} toggle={toggle} />
        {content}
        </>
    )
}
export default  withRouter(UserProfile)