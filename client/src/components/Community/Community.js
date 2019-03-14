import React,{useEffect,useState,Fragment} from 'react'
import getCommunityData from './getCommunityData'
import CommunityDetails from './CommunityDetails/CommunityDetails';
import Loader from '../Loader'
const Community = props => {
    const [community, setComminity] = useState(false)
    const {communityName} = props.match.params
    useEffect( () => {
        getCommunityData(communityName)
        .then(data => {

            if(data.message = 'Succsess'){
                setComminity(data.community)
            }
        })
        
    },[])
    return (
        <div className="community">
           {community ? 
               <>
               <CommunityDetails name={community.name} icon={community.icon} subscribers={community.subscribers}/>
               <div className="community-posts-container"></div>
               </>
           : <Loader />}
        </div>
    )
    

    
}
export default Community 