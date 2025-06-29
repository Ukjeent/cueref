import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  // const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const userLogin = (userId, email, authToken) => {
    setUser(userId);
    setToken(authToken);
    setIsLoggedIn(true);
    setUserEmail(email);
    localStorage.setItem("token", authToken);
    console.log("user logged in: ", userId);
  };

  const userLogout = () => {
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userEmail,
        setUserEmail,
        token,
        isLoggedIn,
        userLogin,
        userLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
