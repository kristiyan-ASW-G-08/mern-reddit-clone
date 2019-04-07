import React, { useState, lazy, Suspense, useContext, useEffect } from 'react';
import getData from '../../util/getData';
import IconForm from './IconForm'
import { withRouter } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext/useAuthContext';
import PostsContainer from '../PostsContainer/PostsContainer';
import SideDrawer from '../SideDrawer/SideDrawer'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faPalette, faLink,faGavel } from '@fortawesome/free-solid-svg-icons';
library.add(faFile, faLink, faPalette,faGavel);
const ModTools = props => {
  const [posts, setPosts] = useState(false);
  const [community, setCommunity] = useState(false);
  const [page, setPage] = useState(1);
  const [tool, setTool] = useState('spam');
  const { isAuth, userId, token } = useAuthContext();
  const { communityName } = props.match.params;
  useEffect(() => {
    const apiUrl = `http://localhost:8080/community/get/${communityName}`;
    getData(apiUrl).then(data => {
      if (data.community) {
        setCommunity(data.community);
      }
    });
  }, []);

  const getNextPage = async () => {};
 
  let content;
  if (community) {
    const contentObj = {
      spam:<PostsContainer
      posts={posts}
      getNextPage={getNextPage}
      setPosts={setPosts}
      postsCount={0}
    />,
    customization:<IconForm  community={community} token={token}/>
    }
    content = contentObj[tool]
    
  }
  return (
    <>
      {community ? (
        <div className="mod-tools">
          <div className="mod-tools-tool-selector">
          <SideDrawer />
            {/* <button
              onClick={() => setTool('spam')}
              className={`button button-icon ${
                tool === 'spam' ? 'active' : ''
              }`}
            >
              <FontAwesomeIcon icon="file" /> <span>Spam</span>
            </button>
            <button
              onClick={() => setTool('customization')}
              className={`button button-icon ${
                tool === 'customization' ? 'active' : ''
              }`}
            >
              <FontAwesomeIcon icon="palette" />
              <span>Customization</span>
            </button>
            <button onClick={() => setTool('rules')} className={`button button-icon ${tool === 'rules' ? "active" : ''}`}><FontAwesomeIcon icon="gavel" /><span>Rules</span></button> */}
          </div>
          {/* {content} */}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default withRouter(ModTools);
