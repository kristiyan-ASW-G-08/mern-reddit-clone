export const LOGIN = 'LOGIN';
export const SIGNUP = 'SIGNIN';
export const LOGOUT = 'LOGOUT';

const login = async authData => {
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
    if (response.status === 422) {
      throw new Error('Validation failed.');
    }
    if (response.status !== 200 && response.status !== 201) {
      console.log('Error!');
      throw new Error('Could not authenticate you!');
    }
    if (response.status === 200) {
      const responseData = await response.json();

      localStorage.setItem('token', responseData.token);
      localStorage.setItem('userId', responseData.userId);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem('expiryDate', expiryDate.toISOString());
      // this.setAutoLogout(remainingMilliseconds);
      return {
        isAuth: true,
        token: responseData.token,
        userId: responseData.userId
      };
    }
  } catch (err) {
    console.log(err);
  }
};

const signup = async authData => {
  try {
    const { username, email, password, matchPassword } = authData;
    const response = await fetch('http://localhost:8080/auth/signup', {
      method: 'POST',
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
    if (response.status === 422) {
      throw new Error(
        "Validation failed. Make sure the email address isn't used yet!"
      );
    }
    if (response.status !== 200 && response.status !== 201) {
      console.log('Error!');
      throw new Error('Creating a user failed!');
    } else if (response.status === 200) {
      const responseData = await response.json();
      this.props.history.replace('/');

      return {
        isAuth: true,
        token: responseData.token,
        userId: responseData.userId
      };
    }
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
export const authReducer = (authData, action) => {
  switch (action.type) {
    case LOGIN:
      return login(authData);
    case SIGNUP:
      return signup(authData);
    case LOGOUT:
      return logout();
    default:
      return authData;
  }
};
