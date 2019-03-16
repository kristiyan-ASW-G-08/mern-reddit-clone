import autoLogout from '../authUtil/autoLogout'
const login = async (authData,logout) => {
    try {
      const { email, password } = authData;
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const responseData = await response.json();
      if (response.status !== 200 && response.status !== 201) {
        const {data} = responseData
        return {
          data,
        };
    
      }
      if (response.status === 200) {
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('userId', responseData.userId);;
        localStorage.setItem('userData', JSON.stringify(responseData.userData));;
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        // autoLogout(remainingMilliseconds,logout)
        return {
          isAuth: true,
          token: responseData.token,
          userId: responseData.userId,
          userData:responseData.userData
        };
      }
    } catch (err) {
      console.log(err);
    }
  };
  export default login