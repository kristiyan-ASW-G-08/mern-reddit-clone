const getPosts  = async postId => {
    console.log('wtf')
    const response  =  await fetch(`http://localhost:8080/get-post/${postId}`, {
        method: 'GET',
      });

      const responseData = await response.json()
      return responseData
}
export default getPosts

