import React,{useState} from 'react'

const useImagePicker = initialState => {
    const [image,setImage] = useState(null)
    const imagePickerHandler = e => {
        const image = e.target.files[0]
        setImage(image)
    }    
    return {image, imagePickerHandler}
  }
  export default useImagePicker