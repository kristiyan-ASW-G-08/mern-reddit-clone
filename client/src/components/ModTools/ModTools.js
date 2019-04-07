import React ,{useState,lazy,Suspense,useContext,useEffect} from 'react'
import getData from '../../util/getData'
import postFormData from '../../util/postFormData'
import {withRouter} from 'react-router-dom'
import useAuthContext from '../../hooks/useAuthContext/useAuthContext'
import useImagePicker from '../../hooks/useImagePicker/useImagePicker'
import PostsContainer from '../PostsContainer/PostsContainer'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFile,faPalette,faLink
} from '@fortawesome/free-solid-svg-icons';
library.add(faFile,faLink,faPalette);
const ModTools = props => {
    const [posts,setPosts] = useState(false)
    const [community,setCommunity] = useState(false)
    const [page,setPage] = useState(1)
    const [tool,setTool] = useState('spam')
    const {isAuth,userId,token} = useAuthContext()
    const {image,imagePickerHandler} = useImagePicker()
    const {communityName} = props.match.params
    useEffect(() => {
        const apiUrl = `http://localhost:8080/community/get/${communityName}`
        getData(apiUrl)
        .then(data => {
            if(data.community){
                setCommunity(data.community)    
                console.log(data.community)   
            }
        })
    },[])

    const getNextPage =async () => {

    }
    const changeImageHandler = async e => {
    e.preventDefault()
      const apiUrl = `http://localhost:8080/community/icon/${communityName}`
      const formData = new FormData()
      formData.append('image',image)
       const responseData = await postFormData(apiUrl,formData,token)
       console.log(responseData)
    }
    let content;
    if(community){
        if(tool === 'spam'){
            content  = <PostsContainer posts={posts} getNextPage={getNextPage} setPosts={setPosts} postsCount={0}/>
        }else if(tool === 'customization') {
            content = 
                <form className="form" onSubmit={changeImageHandler}>
                 <div className="form--logo">
                   <img src={`http://localhost:8080${community.icon}`} alt="logo" />
                </div>
                <label className="label">Change Community Icon</label>
                <input onChange={imagePickerHandler}type="file" className="input" required/>
                <button className="button">Change</button>
                </form>
        }
    }
    return (
        <>{
            community ? <div className="mod-tools">
            <div className="mod-tools-tool-selector">
        <button onClick={() => setTool('spam')} className={`button button-icon ${tool === 'spam' ? "active" : ''}`}><FontAwesomeIcon icon="file" /> <span>Spam</span></button>
        <button onClick={() => setTool('customization')} className={`button button-icon ${tool === 'customization' ? "active" : ''}`}><FontAwesomeIcon icon="palette" /><span>Customization</span></button>
        {/* <button onClick={() => setType('link')} className={`button button-icon ${type === 'link' ? "active" : ''}`}><FontAwesomeIcon icon="link" /><span>Link</span></button> */}
        </div>
           {content}
            </div> : <></>
        }</>
        

    )
}
export default withRouter(ModTools)




