import { createContext, useContext, useState, useEffect } from "react";
import { apiBase, endPoint } from "../utils/config.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState(localStorage.getItem("email"));
  const [accountType, setAccountType] = useState(
    localStorage.getItem("accountType")
  );
  const [userLastLogin, setUserLastLogin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [clearInfo, setClearInfo] = useState(false);
  const [closeModal, setCloseModal] = useState(false);

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
        setAccountType(userData["user_type"]);
        localStorage.setItem("accountType", userData["user_type"]);
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

  const userLogout = (callback) => {
    setUser(null);
    setToken(null);
    setUserEmail(null);
    setIsLoggedIn(false);
    setClearInfo(true);
    setCloseModal(true);
    localStorage.removeItem("email");
    localStorage.removeItem("token");

    if (callback) callback();
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
        closeModal,
        setCloseModal,
        isLoggedIn,
        setIsLoggedIn,
        userLogin,
        userLogout,
        validateAndGetUser,
        accountType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
