import React ,{useState,lazy,Suspense,useContext,useEffect} from 'react'
import getData from '../../util/getData'
import {withRouter} from 'react-router-dom'
import {AuthContextData} from '../../AuthContext/AuthContext'
import PostsContainer from '../PostsContainer/PostsContainer'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFile,faPalette,faLink
} from '@fortawesome/free-solid-svg-icons';
library.add(faFile,faLink,faPalette);
const ModTools = props => {
    const [posts,setPosts] = useState(false)
    const [page,setPage] = useState(1)
    const [tool,setTool] = useState('spam')
    const {authState} = useContext(AuthContextData)
    const {isAuth,userId,token} = authState
    const {communityId} = props.match.params
    useEffect(() => {
        if(isAuth){
            const apiUrl = `http://localhost:8080/community/spam/${communityId}`
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
    let content;
    if(tool === 'spam'){
        content  = <PostsContainer posts={posts} getNextPage={getNextPage} setPosts={setPosts} postsCount={0}/>
    }else {
        content = <form>
            {/* <input onChange={imagePickerHandler}type="file" className="input" required/> */}
        </form>
    }
    return (
        <div className="mod-tools">
        <div className="mod-tools-tool-selector">
    <button onClick={() => setTool('spam')} className={`button button-icon ${tool === 'spam' ? "active" : ''}`}><FontAwesomeIcon icon="file" /> <span>Spam</span></button>
    <button onClick={() => setTool('customization')} className={`button button-icon ${tool === 'customization' ? "active" : ''}`}><FontAwesomeIcon icon="palette" /><span>Customization</span></button>
    {/* <button onClick={() => setType('link')} className={`button button-icon ${type === 'link' ? "active" : ''}`}><FontAwesomeIcon icon="link" /><span>Link</span></button> */}
    </div>
        </div>

    )
}
export default withRouter(ModTools)




