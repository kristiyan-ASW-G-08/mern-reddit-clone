import React ,{useState,lazy,Suspense,useContext,useEffect} from 'react'
import getData from '../../util/getData'
import {AuthContextData} from '../../AuthContext/AuthContext'


import PostsContainer from '../PostsContainer/PostsContainer';
const UserPosts= props => {
    const [posts,setPosts] = useState(false)
    const [postsCount,setPostsCount] = useState(0)
    const [page,setPage] = useState(1)
    const {authState} = useContext(AuthContextData)
    const {isAuth,userId} = authState
    useEffect(() => {
        if(isAuth){
            const apiUrl = `http://localhost:8080/user/posts/${userId}`
           getData(apiUrl)
           .then(data => {
               if(data.posts){
                   setPosts(data.posts)
                   console.log(data)
               }
           })
        }
      
    },[])

    const getNextPage =async () => {
        await setPage(page + 1);
     const apiUrl = `http://localhost:8080/user/posts/${userId}?page=${page + 1}`;
    const responseData = await getData(apiUrl);
    if (responseData.posts) {
      setPosts(posts.concat(responseData.posts));
    }
    }
  
    return (
        <>
         <PostsContainer posts={posts} getNextPage={getNextPage} setPosts={setPosts} community={null} postsCount={postsCount}/>
        </>
    )
}
export default UserPosts





