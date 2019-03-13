import React,{useEffect,useState,Fragment} from 'react'
import getCommunityData from './getCommunityData'
import CommunityDetails from './CommunityDetails/CommunityDetails';
import Loader from '../Loader'
const Community = props => {
    const [community, setComminity] = useState(false)
    console.log(props)
    const {communityName} = props.match.params
    console.log(communityName)
    useEffect( () => {
        getCommunityData(communityName)
        .then(data => {
            console.log(data)
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
               </>
           : <Loader />}
        </div>
    )
    

    
}
export default Community 