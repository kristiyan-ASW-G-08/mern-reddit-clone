const deleteData = async (url,token) => {
    const response  =  await fetch(url, {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
      });

      const responseData = await response.json()
      return responseData
    
}
export default deleteData