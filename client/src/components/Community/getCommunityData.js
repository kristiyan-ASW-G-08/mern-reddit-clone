const getCommunityData  = async communityName => {
    const response  =  await fetch(`http://localhost:8080/community/${communityName}`, {
        method: 'GET',
      });

      const responseData = await response.json()

      return responseData
}
export default getCommunityData