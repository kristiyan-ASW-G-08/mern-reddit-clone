import React, { useState ,useContext,useEffect} from 'react';
import Input from '../Input/Input';
import { withRouter,} from 'react-router-dom';
import ValidationErrorsList from '../ValidationErrorsList/ValidationErrorsList';
import useValidationErrors from '../../hooks/useValidationErrors'
import createPost from './createPost'
import {AuthContextData} from '../../AuthContext/AuthContext'
import editPost from './editPost';
const PostForm = props => {
  console.log(props)
  const {communityId} = props.match.params
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [validationErrorMessages,validationErrorParams,toggleValidationErrors] = useValidationErrors()
  const authState = useContext(AuthContextData)
  const submitHandler = e => {
    e.preventDefault()
    const {token} = authState.authState
    let postId
    if(props.match.params.postId){
      postId = props.match.params.postId
      editPost(postId,title,content,token)
      props.history.replace(`/post/${postId}`)
    }else {
      createPost(communityId,title,content,token)
      .then(data => {
        console.log(data)
        postId = data.postId
         props.history.replace(`/post/${postId}`)
      })
    }
   
  }
  
  useEffect(() => {
    if(props.match.params.postId){
      const {postId} = props.match.params
      const {post} = props.history.location
      const {content,title} = post
      setTitle(title)
      setContent(content)
      console.log(post)
    }
  },[])
  return (
    <form className="form" onSubmit={e => submitHandler(e)}>
       <ValidationErrorsList validationErrorMessages={validationErrorMessages} />
      <Input
        setHook={setTitle}
        value={title}
        placeholder={'Title'}
        type={'text'}
        name={'title'}
        validationErrorParams={validationErrorParams}
      />
        <Input
        setHook={setContent}
        value={content}
        placeholder={'Text (optional)'}
        type={'text'}
        name={'content'}
        validationErrorParams={validationErrorParams}
        textArea={true}
      />
      <button className="button">Post</button>
    </form>
  );
};
export default withRouter(PostForm);
