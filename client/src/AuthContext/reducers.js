export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const USERUPDATE = 'USERUPDATE';

const login =  authData => {
  try {
      return authData
  } catch (err) {
  }
};


const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiryDate');
  localStorage.removeItem('userId');
  localStorage.removeItem('userData');
  return { isAuth: false, token: null, userId: null,userData:null };
};
const userUpdate = (authData) => {
  try {
     const {isAuth,token,userId} = authData.authState
    
    const authState = {
      isAuth,
      token,
      userId,
      userData:authData.newUserData
    }
    console.log(authState)
    localStorage.setItem('userData', JSON.stringify(authData.newUserData));;
    return authState
   
  } catch (err) {
  }
}
export const authReducer = (isAuth, action) => {
  switch (action.type) {
    case LOGIN:
      return login(action.authData);
    case LOGOUT:
      return logout();
      case USERUPDATE:
      return userUpdate(action.authData);
    default:
      return isAuth;
  }
};
