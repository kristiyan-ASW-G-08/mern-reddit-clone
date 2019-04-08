import React,{useEffect,useContext,useState} from 'react'
import getData from '../../util/getData'
import {AuthContextData} from '../../AuthContext/AuthContext'
import PostsContainer from '../PostsContainer/PostsContainer';
const UserUpvoted = props => { 
    const [posts,setPosts] = useState(false)
    const [page,setPage] = useState(1)
    const {authState} = useContext(AuthContextData)
    const {isAuth,userId} = authState
    useEffect(() => {
        const apiUrl = `http://localhost:8080/user/upvoted/${userId}`
        if(isAuth){
           getData(apiUrl)
           .then(data => {
            if(data.posts){
                setPosts(data.posts)
            }
        })
    
        }
        
    },[])

    return (
        <>
         <PostsContainer posts={posts} getNextPage={false} setPosts={setPosts} postsCount={0}/>
        </>
    )
}
export default UserUpvoted 