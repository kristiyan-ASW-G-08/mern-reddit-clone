import React,{useContext,Fragment} from 'react'
import SubscribeButton from '../../SubscribeButton/SubscribeButton'
import { Link} from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuthContext from '../../../hooks/useAuthContext/useAuthContext'
import PropTypes from 'prop-types';
import communityType from '../../PropTypes/communityType'
import {
 faShieldAlt
} from '@fortawesome/free-solid-svg-icons';
library.add(faShieldAlt);
const CommunityDetails = ({community}) => {
    const {userId} = useAuthContext()
    const {name,icon,subscribers,_id,creator} = community
    return (
        <>
        <div className="community-details">
        <div className="community-details-header">
        <h3 className="community-details-title">Community Details </h3>
        {creator === userId ? <Link to={`/mod-tools/${community._id}`}><button className="button button-icon"><FontAwesomeIcon icon="shield-alt" /><span>Mod Tools</span>
        </button></Link> : <></> }
        </div>
        <div className="community-banner">
            <div className="community-logo">
            <img src={`http://localhost:8080/images/${icon}`}  alt={`${name}`} data-testid="community-logo"/>
            </div>
            </div>
            <h1 className="community-name">{name}</h1>
            <h2 className="community-subscribers">Subscribers {subscribers}</h2>
            <div className="buttons-container">
            <SubscribeButton id={_id}/>
            <button className="button">
                <Link data-testid="create-post"  to={`/create-post/${_id}`}>
                Create Post
                </Link>
            </button>
            </div>
        </div>
        </>
    )
}

CommunityDetails.propTypes = {
    community: communityType.isRequired,
  };
export default CommunityDetails 