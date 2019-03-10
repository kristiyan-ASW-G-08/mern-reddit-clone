const autoLogout = (milliseconds,logout) => {
    setTimeout(() => {
      logout();
    }, milliseconds);
  }
  export default autoLogout