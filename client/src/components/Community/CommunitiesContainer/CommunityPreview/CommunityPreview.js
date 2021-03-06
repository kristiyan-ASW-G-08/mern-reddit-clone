import React,{useContext} from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import communityType from '../../../PropTypes/communityType'
const CommunityPreview = ({community}) => {
    const {icon,name,subscribers} = community
    return (
      <Link to={`/community/${name}`}>
    <div  className="community-preview">
    <div className="community-preview-container">
    <div className="community-preview-container-icon">
    <img src={`http://localhost:8080/${icon}`} alt={`${name}`} data-testid="community-logo"/>
    </div>
    </div>
    <div className="community-preview-body">
    <h3 className="community-preview-body-name">c/{name}</h3>
     <h4 className="community-preview-body-subscribers">{subscribers} {subscribers === 1 ? 'subscriber' : 'subscribers'}</h4>
    </div>
    </div>
    </Link>
  );
};
CommunityPreview.propTypes = {
  community: communityType.isRequired,
};
export default CommunityPreview;
