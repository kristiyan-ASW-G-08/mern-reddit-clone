import React,{useContext} from 'react';
import {Link} from 'react-router-dom'
const CommunityPreview = ({community}) => {
    const {icon,name,subscribers} = community
    return (
      <Link to={`/community/${name}`}>
    <div  className="community-preview">
    <div className="community-preview-container">
    <div className="community-preview-container-icon">
    <img src={`http://localhost:8080/images/${icon}`} alt={`${name}`}/>
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
export default CommunityPreview;
