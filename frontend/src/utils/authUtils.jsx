export const storeTokens = ({ access, refresh }) => {
    if (access) localStorage.setItem("accessToken", access);
    if (refresh) localStorage.setItem("refreshToken", refresh);
  };
  
  export const clearTokens = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };
  
  export const getAccessToken = () => localStorage.getItem("accessToken");
  export const getRefreshToken = () => localStorage.getItem("refreshToken");