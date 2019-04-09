const getData  = async (url,token)  => {
  const fetchObj = {
    method: 'GET',
  }
  if(token){
    fetchObj['headers'] =  {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  }
  const response  =  await fetch(url,fetchObj);

    const responseData = await response.json()

    return responseData
}
export default getData
