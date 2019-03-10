export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';


const login =  authData => {
  try {
    console.log(authData)
    console.log('login reducer')
      return authData
  } catch (err) {
    console.log(err);
  }
};


const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiryDate');
  localStorage.removeItem('userId');
  return { isAuth: false, token: null, userId: null };
};

export const authReducer = (isAuth, action) => {
  console.log(isAuth,action)
  switch (action.type) {
    case LOGIN:
      return login(action.authData);
    case LOGOUT:
      return logout();
    default:
      return isAuth;
  }
};
