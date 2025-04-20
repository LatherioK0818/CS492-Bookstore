export const storeTokens = ({ access, refresh }) => {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
  };
  
  export const clearTokens = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };
  