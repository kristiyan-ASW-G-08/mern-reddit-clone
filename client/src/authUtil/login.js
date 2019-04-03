import autoLogout from '../authUtil/autoLogout'
import postData from '../util/postData'
const login = async (authData,logout) => {
    try {
      const apiUrl = 'http://localhost:8080/auth/login'
      const responseData = await postData(apiUrl,authData,'')
        if(responseData.userId){
          localStorage.setItem('token', responseData.token);
        localStorage.setItem('userId', responseData.userId);;
        localStorage.setItem('userData', JSON.stringify(responseData.userData));;
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        return {
          isAuth: true,
          token: responseData.token,
          userId: responseData.userId,
          userData:responseData.userData
        };
      }else {
        return responseData
      }
        
        
    } catch (err) {
      console.log(err);
    }
  };
  export default login