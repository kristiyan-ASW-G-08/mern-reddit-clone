const unsubscribe = async (communityId,token) => {
    const response = await fetch(`http://localhost:8080/unsubscribe/${communityId}`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
    });

    const responseData = await response.json();
    if (responseData.message === 'Validation failed.') {
      return false
    } else if (response.status  === 201) {
      return responseData.userData
    }
  };
export default unsubscribe