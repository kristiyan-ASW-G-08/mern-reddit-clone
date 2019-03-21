const getPosts  = async (postId,page) => {
    console.log('wtf')
    const response  =  await fetch(`http://localhost:8080/comments/${postId}?page=${page}`, {
        method: 'GET',
      });

      const responseData = await response.json()
      return responseData
}
export default getPosts

