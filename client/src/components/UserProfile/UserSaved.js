import React,{useEffect,useContext,useState} from 'react'
import getData from '../../util/getData'
import useAuthContext from '../../hooks/useAuthContext/useAuthContext'
import PostsContainer from '../PostsContainer/PostsContainer';
const UserSaved = props => { 
    const [posts,setPosts] = useState(false)
    const [page,setPage] = useState(1)
    const {isAuth,userId} = useAuthContext()
    useEffect(() => {
        const apiUrl = `http://localhost:8080/user/saved/${userId}`
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
export default UserSaved 