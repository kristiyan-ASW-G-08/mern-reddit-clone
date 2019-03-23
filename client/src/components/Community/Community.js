import React,{useEffect,useState,Fragment} from 'react'
import CommunityDetails from './CommunityDetails/CommunityDetails';
import Loader from '../Loader'
import PostsContainer from '../PostsContainer/PostsContainer'
import getData from '../../util/getData'
const Community = props => {
    const [community, setComminity] = useState(false)
    const {communityName} = props.match.params
    useEffect(  () => {
        const apiUrl = `http://localhost:8080/community/${communityName}`
        getData(apiUrl)
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
               <CommunityDetails  community={community}/> 
               <PostsContainer communityId={community._id} author={community._id}  />
               </>
           : <Loader />}
        </div>
    )
    

    
}
export default Community