const deletePost = async (commentId,token) => {
    console.log(commentId,token)
    const response  =  await fetch(`http://localhost:8080/delete-comment/${commentId}`, {
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