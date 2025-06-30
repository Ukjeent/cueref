import { createContext, useContext, useState, useEffect } from "react";
import { apiBase, endPoint } from "../config.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState(localStorage.getItem("email"));
  const [userLastLogin, setUserLastLogin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [clearInfo, setClearInfo] = useState(false);

  useEffect(() => {
    if (token) {
      validateAndGetUser(token);
    }
  }, []);

  const validateAndGetUser = async (token) => {
    try {
      const response = await fetch(`${apiBase}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const userData = await response.json();
        setIsLoggedIn(true);
        setUser(userData["user_id"]);
        setUserEmail(userData["email"]);
        localStorage.setItem("email", userData["email"]);
      } else {
        userLogout();
      }
    } catch (error) {
      console.log("Error validating user: ", error);
    }
  };

  const userLogin = (userId, email, authToken) => {
    setUser(userId);
    setToken(authToken);
    setUserEmail(email);
    localStorage.setItem("email", email);
    setIsLoggedIn(true);
    localStorage.setItem("token", authToken);
  };

  const userLogout = () => {
    setUser(null);
    setToken(null);
    setUserEmail(null);
    setIsLoggedIn(false);
    setClearInfo(true);
    localStorage.removeItem("email");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userEmail,
        setUserEmail,
        token,
        clearInfo,
        setClearInfo,
        isLoggedIn,
        setIsLoggedIn,
        userLogin,
        userLogout,
        validateAndGetUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
