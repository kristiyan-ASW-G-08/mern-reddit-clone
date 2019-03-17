const deletePost = async (postId,token) => {
    const response  =  await fetch(`http://localhost:8080/delete-post/${postId}`, {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
      });

      const responseData = await response.json()
      return responseData
    
}
export default deletePost