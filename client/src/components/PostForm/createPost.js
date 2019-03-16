const createPost = async (communityId,title,content,token) => {
    const response = await fetch(`http://localhost:8080/create-post`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        communityId,title,content
      })
    });

    const responseData = await response.json();
    if (responseData.message === 'Validation failed.') {
      return false
    } else if (response.status  === 201) {
      return responseData.userData
    }
  };
export default createPost