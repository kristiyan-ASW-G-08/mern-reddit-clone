
import React,{useEffect,useState,Fragment} from 'react'
import CommunityDetails from './CommunityDetails/CommunityDetails';
import Loader from '../Loader'
import CommunityPosts from './CommunityPosts/CommunityPosts'
import getData from '../../util/getData'
import PropTypes ,{ string,shape}from 'prop-types';
import useDocumentTitle from '../../hooks/useDocumentTitle/useDocumentTitle'
const Community = ({match}) => {
    const {communityName} = match.params
    useDocumentTitle(communityName)
    return (
        <div className="community">
               <>
               <CommunityDetails isPost={false}  communityName={communityName}/> 
               <CommunityPosts communityName={communityName}   />
               </>
        </div>
    ) 
}

Community.propTypes = {
   match: shape({
        params:shape({
            communityName:string.isRequired
          })
      })
  };
export default Community