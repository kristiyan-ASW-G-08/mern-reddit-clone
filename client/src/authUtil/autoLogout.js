const autoLogout = (milliseconds,logout) => {

    setTimeout(() => {
      console.log('autoLogout')
      logout();
    }, milliseconds);
  }
  export default autoLogout