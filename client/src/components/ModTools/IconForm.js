import React,{useState} from 'react'
import useImagePicker from '../../hooks/useImagePicker/useImagePicker';
import postFormData from '../../util/postFormData'
const IconForm = ({community,token}) => {
    const { image, imagePickerHandler } = useImagePicker();
    const {icon,name} = community
    const changeImageHandler = async e => {
        e.preventDefault();
        const apiUrl = `http://localhost:8080/community/icon/${name}`;
        const formData = new FormData();
        formData.append('image', image);
        const responseData = await postFormData(apiUrl, formData, token);
        // const editedCommunity = community;
        // editedCommunity.icon = responseData.newIcon;
        // setCommunity(editedCommunity);
      };
    return (
<form className="form" onSubmit={changeImageHandler}>
          <div className="form--logo">
            <img src={`http://localhost:8080/${icon}`} alt="logo" />
          </div>
          <label className="label">Change Community Icon</label>
          <input
            onChange={imagePickerHandler}
            type="file"
            className="input"
            required
          />
          <button className="button">Change</button>
        </form>
    )
}
export default IconForm 