const getPosts  = async (communityId,page) => {
    console.log('wtf')
    const response  =  await fetch(`http://localhost:8080/posts/${communityId}?page=${page}`, {
        method: 'GET',
      });

      const responseData = await response.json()
      return responseData
}
export default getPosts

