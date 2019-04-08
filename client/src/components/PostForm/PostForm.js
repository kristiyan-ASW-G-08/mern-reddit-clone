import React, { useState, useContext, useEffect } from 'react';
import Input from '../Input/Input';
import { withRouter } from 'react-router-dom';
import ValidationErrorsList from '../ValidationErrorsList/ValidationErrorsList';
import useValidationErrors from '../../hooks/useValidationErrors/useValidationErrors';
import useDocumentTitle from '../../hooks/useDocumentTitle/useDocumentTitle'
import postData from '../../util/postData';
import postFormData from '../../util/postFormData';
import useAuthContext from '../../hooks/useAuthContext/useAuthContext'
import useImagePicker from '../../hooks/useImagePicker/useImagePicker'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFile,faImage,faLink
} from '@fortawesome/free-solid-svg-icons';
library.add(faFile,faImage,faLink);
const PostForm = props => {
  const { communityId } = props.match.params;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type,setType] = useState('post')
  const {image,imagePickerHandler} = useImagePicker()
  const {token}  = useAuthContext()
  useDocumentTitle('Submit to Rereddit')
  const {
    validationErrorMessages,
    validationErrorParams,
    toggleValidationErrors
   } = useValidationErrors();
  const submitHandler = async e => {
    e.preventDefault();
    let postId;
    let apiUrl;
    const post = {
      title,
      content
    };
    if (props.match.params.postId) {
      postId = props.match.params.postId;
      apiUrl = `http://localhost:8080/post/edit/${postId}`;
    } else {
      apiUrl = `http://localhost:8080/post/post/${communityId}?type=text`;
    }
    if(type === 'post'){
      const responseData = await postData(apiUrl, post, token);
      if (responseData.validationErrors) {
        toggleValidationErrors(responseData.validationErrors);
      } else {
        postId = postId ? postId : responseData.postId;
        props.history.replace(`/post/${postId}`);
      }
    }else if(type === 'image'){
      apiUrl = `http://localhost:8080/post/post/${communityId}?type=image`
      const formData = new FormData()
      formData.append('title',title)
      formData.append('image',image)
       const responseData = await postFormData(apiUrl,formData,token)
       postId = responseData.postId;
       props.history.replace(`/post/${postId}`);

    }
  };
  
  useEffect(() => {
    if (props.match.params.postId) {
      const { post } = props.history.location;
      const { content, title } = post;
      setTitle(title);
      setContent(content);
    }
  }, []);

  let formContent 
  if(type === 'post'){
    formContent = <>
      <Input
        setHook={setContent}
        value={content}
        placeholder={'Text (optional)'}
        type={'text'}
        name={'content'}
        validationErrorParams={validationErrorParams}
        textArea={true}
      />
    </>
  }else if(type === 'image'){
    formContent = <input onChange={imagePickerHandler}type="file" className="input" required/>
  }
  return (
    <>
    <div className="form-type">
    <button onClick={() => setType('post')} className={`button button-icon ${type === 'post' ? "active" : ''}`}><FontAwesomeIcon icon="file" /> <span>Post</span></button>
    <button onClick={() => setType('image')} className={`button button-icon ${type === 'image' ? "active" : ''}`}><FontAwesomeIcon icon="image" /><span>Image</span></button>
    <button onClick={() => setType('link')} className={`button button-icon ${type === 'link' ? "active" : ''}`}><FontAwesomeIcon icon="link" /><span>Link</span></button>
    </div>
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
      {formContent}
      <button className="button">Submit</button>
    </form>
    </>
  );
};
export default withRouter(PostForm);
