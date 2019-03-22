const postData = async (url,content,token) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(content)
    });

    const responseData = await response.json();
    if (response.status  === 201) {
        return responseData}
        else {
            return false 
        }
  };
export default postData