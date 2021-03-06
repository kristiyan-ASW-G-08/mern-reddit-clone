import React, { useState, lazy, Suspense, useContext, useEffect } from 'react';
import getData from '../../util/getData';
import IconForm from './IconForm';
import { withRouter } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext/useAuthContext';
import useToggle from '../../hooks/useToggle/useToggle';
import PostsContainer from '../PostsContainer/PostsContainer';
import RulesPage from './RulesPage/RulesPage'
import ReportsPage from './ReportsPage/ReportsPage'
import SideDrawer from '../SideDrawer/SideDrawer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFile,
  faPalette,
  faLink,
  faGavel
} from '@fortawesome/free-solid-svg-icons';
library.add(faFile, faLink, faPalette, faGavel);
const ModTools = ({ history, match }) => {
  const [community, setCommunity] = useState(false);
  const { isAuth, userId, token } = useAuthContext();
  const { on, toggle } = useToggle();
  const { communityName } = match.params;
  useEffect(() => {
    const apiUrl = `http://localhost:8080/community/get/${communityName}`;
    getData(apiUrl).then(data => {
      if (data.community) {
        setCommunity(data.community);
      }
    });
  }, []);
  let content;
  let pageTitle
  let sideDrawerListItems = []
  if(community){
    const {url} = match
    sideDrawerListItems = [
      {
        active: `/mod-tools/reports/${communityName}`,
        content: 'Reports',
        element:<ReportsPage communityId={community._id} token={token}/>
      },
      {
        active: `/mod-tools/customization/${communityName}`,
        content: 'Customization',
        element:<IconForm community={community} token={token}/>
      },
      {
        active: `/mod-tools/rules/${communityName}`,
        content: 'Rules',
        element:<RulesPage communityId={community._id} communityName={community.name}/>
      },
      {
        active: `/mod-tools/home/${communityName}`,
        content: 'Home',
        element:<h1>Home</h1>
      }
    ];
    const selectedElement = sideDrawerListItems.find(item => item.active === url)
    content = selectedElement.element
    pageTitle = selectedElement.content
  }
   
  return (
    <> 
      <button className="button button-profile" onClick={toggle}>{pageTitle} / More</button>
      <SideDrawer on={on} toggle={toggle} listItems={sideDrawerListItems} />
      {content}
      </>
  );
};
export default withRouter(ModTools);
