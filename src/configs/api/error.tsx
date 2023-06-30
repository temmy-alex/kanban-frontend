const ErrorHandler = (error : any) => {
    if (error && error.response && error.response.status === 401) {
      window.localStorage.removeItem('accessToken');
      window.location.replace('/auths/sign-in');
    }
  };
  
  export default ErrorHandler;