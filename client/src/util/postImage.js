const postImage = async (url,formData,token) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body:formData
    });
  
    const responseData = await response.json();
    if (response.status === 422) {
      const validationErrors = responseData.data
      return {
        validationErrors,
      };
    }
    return responseData
  };
  export default postImage
  
  
  
  
  