import { apiBase, endPoint } from "../config.js";
import { useAuthContext } from "../contexts/AuthContext";
import { useState, useEffect } from "react";

function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [wrongPassword, setWrongPassword] = useState(false);
  const {
    user,
    setUser,
    setUserEmail,
    clearInfo,
    setClearInfo,
    token,
    isLoggedIn,
    setIsLoggedIn,
    userLogin,
  } = useAuthContext();

  const register = async (email, password) => {
    if (email && password) {
      setLoading(true);
      try {
        const response = await fetch(`${apiBase}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (response.status === 201) {
          const json = await response.json();
          userLogin(json["user_id"], json["user_email"], json["access_token"]);
          setClearInfo(true);
          setLoading(false);
        } else if (response.status === 409) {
          const json = await response.json();
          console.log(json["detail"]);
          setError(json["detail"]);
          setLoading(false);
        } else if (response.status === 500) {
          setLoading(false);
          const json = await response.json();
          setError(json["detail"]);
        }
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error("Register error: ", error);
      }
    }
  };

  const login = async (email, password) => {
    if (email && password) {
      setLoading(true);
      setWrongPassword(false);

      try {
        const response = await fetch(`${apiBase}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        if (response.status === 200) {
          setLoading(false);
          const json = await response.json();
          console.log("login success: ", json);
          userLogin(json["user_id"], json["user_email"], json["access_token"]);
          setClearInfo(true);
        } else if (response.status === 409) {
          setLoading(false);
          setWrongPassword(true);
          const json = await response.json();
        } else if (response.status === 500) {
          setLoading(false);
          const json = await response.json();
          setError(json["detail"]);
        }
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error("Login error: ", error);
      }
    }
  };

  return { register, login, loading, error, wrongPassword };
}

export default useAuth;
