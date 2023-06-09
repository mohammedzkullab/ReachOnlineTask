import { useState, createContext } from "react";
export const AuthContext = createContext({
  token: "",
  userData: { full_name: "" },
  isLoggedIn: false,
  login: (f, y) => f,
  logout: (f) => f,
});

const AuthContextProvider = (props) => {
  const initToken = localStorage.getItem("token");
  const initUserData = JSON.parse(localStorage.getItem("userData"));
  const [token, setToken] = useState(initToken);
  const [user, setUser] = useState(initUserData);
  const isLoggedIn = !!token;
  const login = (token, userData) => {
    setToken(token);
    setUser(userData);
    localStorage.setItem("token", token);
    localStorage.setItem("userData", JSON.stringify(userData));
  };
  const logout = () => {
    console.log("logging out ...");
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setToken(null);
    setUser(null);
  };
  const setUserData = (userData) => {
    localStorage.removeItem("userData");
    localStorage.setItem("userData", JSON.stringify(userData));
    setUser(userData);
  };
  const contextValue = {
    token: token,
    userData: user,
    isLoggedIn: isLoggedIn,
    login,
    logout,
    setUserData,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
