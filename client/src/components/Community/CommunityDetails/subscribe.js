const subscribe = async (communityId,token) => {
     const response  =  await fetch(`http://localhost:8080/subscribe/${communityId}`, {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
      });

      const responseData = await response.json()

      return responseData
}
export default subscribe