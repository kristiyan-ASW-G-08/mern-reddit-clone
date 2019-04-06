import React,{useEffect,useState,Fragment} from 'react'
import CommunityDetails from './CommunityDetails/CommunityDetails';
import Loader from '../Loader'
import CommunityPosts from './CommunityPosts/CommunityPosts'
import getData from '../../util/getData'
import PropTypes ,{ string,shape}from 'prop-types';
import useDocumentTitle from '../../hooks/useDocumentTitle/useDocumentTitle'
const Community = ({match}) => {
    const [community, setCommunity] = useState(false)
    const {communityName} = match.params
    useDocumentTitle(communityName)
    useEffect(  () => {
        const apiUrl = `http://localhost:8080/community/get/${communityName}`
        getData(apiUrl)
        .then(data => {
            if(data.community){
                setCommunity(data.community)       
            }
        })
    },[])
    return (
        <div className="community">
           {community ? 
               <>
               <CommunityDetails  community={community}/> 
               <CommunityPosts communityName={communityName}   />
               </>
           : <Loader />}
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