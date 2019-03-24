import React ,{useState,lazy,Suspense,useContext,useEffect} from 'react'
import getData from '../../util/getData'
import {withRouter} from 'react-router-dom'
import {AuthContextData} from '../../AuthContext/AuthContext'
import PostsContainer from '../PostsContainer/PostsContainer'
const ModTools = props => {
    const [posts,setPosts] = useState(false)
    const [page,setPage] = useState(1)
    const {authState} = useContext(AuthContextData)
    const {isAuth,userId,token} = authState
    const {communityId} = props.match.params
    useEffect(() => {
        if(isAuth){
            const apiUrl = `http://localhost:8080/get-spam/${communityId}`
        const response  =  fetch(apiUrl, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          })
          .then(data => {
            return data.json()
          })
          .then(data => {
              if(data.posts){
                  setPosts(data.posts)
              }
          })
        }
      
    },[])

    const getNextPage =async () => {

    }
  
    return (
        <div className="mod-tools">
         <PostsContainer posts={posts} getNextPage={getNextPage} setPosts={setPosts}/>
        </div>

    )
}
export default withRouter(ModTools)




