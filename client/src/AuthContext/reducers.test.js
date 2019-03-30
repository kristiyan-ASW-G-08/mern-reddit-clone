import { LOGIN, LOGOUT, USERUPDATE, authReducer } from './reducers';

describe('authReducer', () => {

  it('should return authData if action type is LOGIN', () => {
    const isAuth = false;
    const authData = {
      isAuth: true,
      token: 'asdadacwe12',
      userId: '21c3c3',
      userData: {}
    };
    expect(authReducer(isAuth, { type: LOGIN, authData })).toEqual(authData);
  });
  it('should clear token,userId,expieryDate,userData from localStorage and return default authState', () => {
    const authData = {
        isAuth: true,
        token: 'asdadacwe12',
        userId: '21c3c3',
        userData: {}
      };
    const isAuth = false;
    const token = 'testToken';
    const userId = 'testUser';
    const expiryDate = 'testData';
    const userData = { username: 'testUserName' };
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('expiryDate', expiryDate);
    localStorage.setItem('userData', JSON.stringify(userData));
    expect(localStorage.getItem('token')).toMatch(token);
    expect(localStorage.getItem('userId')).toMatch(userId);
    expect(localStorage.getItem('expiryDate')).toMatch(expiryDate);
    expect(JSON.parse(localStorage.getItem('userData'))).toEqual(userData);
    expect(authReducer(isAuth, { type: LOGOUT, authData })).toEqual({
      isAuth: false,
      token: null,
      userId: null,
      userData: null
    });
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('userId')).toBeNull();
    expect(localStorage.getItem('expiryDate')).toBeNull();
    expect(JSON.parse(localStorage.getItem('userData'))).toBeNull();
  });
  it('should return updated authState and set newUserData in localStorage', () => {
    const isAuth = true;
    const authData = {
      authState: {
        isAuth: true,
        token: 'asdadacwe12',
        userId: '21c3c3',
      },
      newUserData: { username: 'newUserName' }
    };
    const newAuthState =  {
        isAuth: true,
        token: 'asdadacwe12',
        userId: '21c3c3',
        userData: { username: 'newUserName' }
      }
    expect(authReducer(isAuth, { type: USERUPDATE, authData })).toEqual(
      newAuthState
    );
    expect(JSON.parse(localStorage.getItem('userData'))).toEqual(authData.newUserData);
  });
});
