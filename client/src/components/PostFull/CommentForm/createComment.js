const createComment = async (postId,content,token) => {
    const response = await fetch(`http://localhost:8080/create-comment/${postId}`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          content
      })
    });

    const responseData = await response.json();
    console.log(responseData)
    console.log(response)
    if (responseData.message === 'Validation failed.') {
      return false
    } else if (response.status  === 200) {
      return responseData
    }
  };
export default createComment