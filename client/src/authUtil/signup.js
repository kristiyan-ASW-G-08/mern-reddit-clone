const signup = async (authData) => {
    try {
      const { username, email, password, matchPassword } = authData;
      console.log(authData)
      const response = await fetch('http://localhost:8080/auth/signup', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          email,
          password,
          matchPassword
        })
      });
      const responseData = await response.json();
      if (response.status === 422) {
        const authErrors = responseData.data
        console.log(authErrors)
        return {
          authErrors,
        };
    
        
      }
      if (response.status !== 200 && response.status !== 201) {
        console.log('Error!');
        throw new Error('Creating a user failed!');
      } else 
      if (response.status === 200) {    
        return {
          authErrors:false,
        };
      }
    } catch (err) {
      console.log(err);
    }
  };

  export default signup