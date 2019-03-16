const getPosts  = async communityId => {
    console.log('wtf')
    const response  =  await fetch(`http://localhost:8080/posts/${communityId}`, {
        method: 'GET',
      });

      const responseData = await response.json()
      return responseData
}
export default getPosts

