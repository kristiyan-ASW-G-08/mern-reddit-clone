import React,{useEffect,useState,Fragment} from 'react'
import getCommunityData from './getCommunityData'
import CommunityDetails from './CommunityDetails/CommunityDetails';
import Loader from '../Loader'
import PostsContainer from '../PostsContainer/PostsContainer'
const Community = props => {
    const [community, setComminity] = useState(false)
    const [posts,setPosts] = useState(false)
    const {communityName} = props.match.params
    useEffect(  () => {
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
               <CommunityDetails name={community.name} icon={community.icon} subscribers={community.subscribers} id={community._id}/> 
               <PostsContainer communityId={community._id} author={community._id} />
               </>
           : <Loader />}
        </div>
    )
    

    
}
export default Community 