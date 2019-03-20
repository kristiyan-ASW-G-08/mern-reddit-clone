import React,{useContext,Fragment} from 'react'
import {AuthContextData} from '../../../AuthContext/AuthContext'

import SubscribeButton from '../../SubscribeButton/SubscribeButton'
import { Route, Redirect,Link} from "react-router-dom";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
 faShieldAlt
} from '@fortawesome/free-solid-svg-icons';
import Community from '../Community';
library.add(faShieldAlt);

const CommunityDetails = props => {
    const {authState} = useContext(AuthContextData)
    const {isAuth,token,userId} = authState
    const {community} = props
    const {name,icon,subscribers,_id,creator} = community
    
    return (
        <>
        <div className="community-details">
        <div className="community-details-header">
        <h3 className="community-details-title">Community Details </h3>
        {creator === userId ? <Link to={`/mod-tools/${community.name}`}><button className="button post-info-button"><FontAwesomeIcon icon="shield-alt" /><span>Mod Tools</span>
        </button></Link> : <></> }
        </div>
        <div className="community-banner">
            <div className="community-logo">
            <img src={`http://localhost:8080/images/${icon}`} alt={`${name}`}/>
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
export default CommunityDetails 