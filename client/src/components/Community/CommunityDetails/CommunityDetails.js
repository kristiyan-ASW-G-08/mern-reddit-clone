import React,{useContext,Fragment,useState,useEffect} from 'react'
import SubscribeButton from '../../SubscribeButton/SubscribeButton'
import { Link} from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuthContext from '../../../hooks/useAuthContext/useAuthContext'
import Loader from '../../Loader'
import PropTypes,{string,bool} from 'prop-types';
import getData from '../../../util/getData'
import communityType from '../../PropTypes/communityType'
import {
 faShieldAlt
} from '@fortawesome/free-solid-svg-icons';
library.add(faShieldAlt);
const CommunityDetails = ({communityName,isPost}) => {
    const {userId} = useAuthContext()
    const [community,setCommunity] = useState(null) 
    useEffect(  () => {
        const apiUrl = `http://localhost:8080/community/get/${communityName}`
        getData(apiUrl)
        .then(data => {
            if(data.community){
                setCommunity(data.community)       
            }
        })
    },[])
    let content
    if(community){
       content =  <>
            <div className="community-details">
            <div className="community-details-header">
            <h3 className="community-details-title">Community Details </h3>
            {community.creator === userId ? <Link to={`/mod-tools/home/${community.name}`}><button className="button button-icon"><FontAwesomeIcon icon="shield-alt" /><span>Mod Tools</span>
            </button></Link> : <></> }
            </div>
            <div className="community-banner">
                <div className="community-logo">
                <img src={`http://localhost:8080/${community.icon}`}  alt={`${community.name}`} data-testid="community-logo"/>
                </div>
                </div>
                <h1 className="community-name">{community.name}</h1>
                <h2 className="community-subscribers">Subscribers {community.subscribers}</h2>
                <div className="buttons-container">
                <SubscribeButton id={community._id}/>
                {isPost ?  '' : <button className="button">
                    <Link data-testid="create-post"  to={`/create-post/${community._id}`}>
                    Create Post
                    </Link>
                </button>}
                </div>
            </div>
            </>
    }else {
        content = <Loader/>
    }
    return <>{content}</>
}

CommunityDetails.propTypes = {
    isPost: bool.isRequired,
    communityName: string.isRequired,
  };
export default CommunityDetails 