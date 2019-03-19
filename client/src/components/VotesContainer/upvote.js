const upvote =  async (postId,token) => {
    console.log(token,postId)
    const response = await fetch(`http://localhost:8080/upvote/${postId}`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
    });
    const responseData = await response.json();
    console.log(response)
    console.log(responseData)
    if (response.status  === 200) {
      return responseData
    }
  };

export default upvote

