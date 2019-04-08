import React, { useState, lazy, Suspense, useContext, useEffect } from 'react';
import getData from '../../util/getData';
import IconForm from './IconForm';
import { withRouter } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext/useAuthContext';
import useToggle from '../../hooks/useToggle/useToggle';
import PostsContainer from '../PostsContainer/PostsContainer';
import RulesPage from './RulesPage/RulesPage'
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
  let sideDrawerListItems = []
  if(community){
    const {url} = match
    sideDrawerListItems = [
      {
        active: `/mod-tools/reports/${communityName}`,
        content: 'Reports',
        element:<h1>Reports</h1>
      },
      {
        active: `/mod-tools/customization/${communityName}`,
        content: 'Customization',
        element:<h1>Customization</h1>
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
    content = sideDrawerListItems.find(item => item.active === url).element
  }
   
  return (
    <>
      <button className="button" onClick={toggle}>Mod Options</button>
      <SideDrawer on={on} toggle={toggle} listItems={sideDrawerListItems} />
      {content}
      </>
  );
};
export default withRouter(ModTools);
