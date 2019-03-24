import React,{useEffect,useContext,useState} from 'react'
import Breadcrumbs from './Breadcrumbs'
import getData from '../../util/getData'
import {AuthContextData} from '../../AuthContext/AuthContext'
import PostsContainer from '../PostsContainer/PostsContainer';
const UserDownvoted = props => { 
    const [posts,setPosts] = useState(false)
    const [page,setPage] = useState(1)
    const {authState} = useContext(AuthContextData)
    const {isAuth,userId} = authState
    useEffect(() => {
        const apiUrl = `http://localhost:8080/user-get-downvoted/${userId}`
        if(isAuth){
           getData(apiUrl)
           .then(data => {
            if(data.posts){
                setPosts(data.posts)
            }
        })
    
        }
        
    },[])
    const getNextPage =async () => {
    //     await setPage(page + 1);
    //  const apiUrl = `http://localhost:8080/user-get-saved/${userId}?page=${page + 1}`;
    // const responseData = await getData(apiUrl);
    // if (responseData.posts) {
    //     console.log(responseData.posts)
    // //   setPosts(posts.concat(responseData.posts));
    // }
    }
    return (
        <>
        <div className="user-page">
            <Breadcrumbs />
        </div>
         <PostsContainer posts={posts} getNextPage={getNextPage} setPosts={setPosts}/>
        </>
    )
}
export default UserDownvoted 