export const LOGIN = 'LOGIN';
export const SIGNIN = 'SIGNIN';
export const LOGOUt = 'LOGOUT';

const login = async (authData) => {
    const {email,password} = authData
  const response =   await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
        if (response.status === 422) {
          throw new Error('Validation failed.');
        }
        if (response.status !== 200 && res.status !== 201) {
          console.log('Error!');
          throw new Error('Could not authenticate you!');
        }
        if(res.status === 200){
            const responseData = await response.json()
                  
            localStorage.setItem('token', responseData.token);
            localStorage.setItem('userId', responseData.userId);
            const remainingMilliseconds = 60 * 60 * 1000;
            const expiryDate = new Date(
              new Date().getTime() + remainingMilliseconds
            );
            localStorage.setItem('expiryDate', expiryDate.toISOString());
            // this.setAutoLogout(remainingMilliseconds);
            return { isAuth: true,
                token: responseData.token,
                userId: responseData.userId}  
          }      
};


export const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return login(authData);
    default:
      return state;
  }
};