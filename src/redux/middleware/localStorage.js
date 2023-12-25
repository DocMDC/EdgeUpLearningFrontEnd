const localStorageMiddleware = (store) => (next) => (action) => {
    if (action.type === "auth/setPersist") {
      localStorage.setItem("persist", JSON.stringify(action.payload));
    }
    return next(action);
  };
  
  export default localStorageMiddleware;
  