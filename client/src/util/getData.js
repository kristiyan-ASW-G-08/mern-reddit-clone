const getData  = async url  => {
  console.log(url)
  const response  =  await fetch(url, {
      method: 'GET',
    });

    const responseData = await response.json()

    return responseData
}
export default getData
