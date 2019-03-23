const postData = async (url,data,token) => {
  console.log('nani')
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const responseData = await response.json();
  if (response.status === 422) {
    const validationErrors = responseData.data
    return {
      validationErrors,
    };
  }
  return responseData
};
export default postData





