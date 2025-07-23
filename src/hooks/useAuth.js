import { apiBase } from "../utils/config.js";
import { useAuthContext } from "../contexts/AuthContext";
import { useState, useEffect } from "react";

function useAuth() {
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const {
    user,
    setUser,
    setUserEmail,
    clearInfo,
    setClearInfo,
    setCloseModal,
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
          setCloseModal(true);
          setLoading(false);
        } else if (response.status === 409) {
          const json = await response.json();
          setApiResponse(json["detail"]);
          setLoading(false);
        } else if (response.status === 500) {
          setLoading(false);
          const json = await response.json();
          setApiResponse(json["detail"]);
        }
      } catch (error) {
        setApiResponse(error);
        setLoading(false);
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
          userLogin(
            json["user_id"],
            json["user_email"],
            // json["user_type"],
            json["access_token"]
          );
          setClearInfo(true);
          setCloseModal(true);
        } else if (response.status === 409) {
          setLoading(false);
          setWrongPassword(true);
          const json = await response.json();
          setApiResponse(json["detail"]);
        } else if (response.status === 500) {
          setLoading(false);
          const json = await response.json();
          setApiResponse(json["detail"]);
        }
      } catch (error) {
        setApiResponse(error);
        setLoading(false);
        console.error("Login error: ", error);
      }
    }
  };

  const sendResetEmail = async (email) => {
    if (email) {
      setLoading(true);
      try {
        const response = await fetch(`${apiBase}/auth/reset-password-request`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        if (response.status === 200) {
          setLoading(false);
          const json = await response.json();
          setApiResponse(json["detail"]);
        } else if (response.status === 409) {
          setLoading(false);
          const json = await response.json();
          setApiResponse(json["detail"]);
        } else if (response.status === 500) {
          setLoading(false);
          const json = await response.json();
          setApiResponse(json["detail"]);
        }
      } catch (error) {
        setApiResponse(error);
        setLoading(false);
        console.error("Login error: ", error);
      }
    }
  };

  const ResetPassword = async (token, password) => {
    if (token && password) {
      setLoading(true);
      try {
        const response = await fetch(`${apiBase}/auth/reset-password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, password }),
        });
        if (response.status === 200) {
          setLoading(false);
          const json = await response.json();
          setApiResponse(json["detail"]);
        } else if (response.status === 400) {
          setLoading(false);
          const json = await response.json();
          setApiResponse(json["detail"]);
        } else if (response.status === 401) {
          setLoading(false);
          const json = await response.json();
          setApiResponse(json["detail"]);
        } else if (response.status === 500) {
          setLoading(false);
          const json = await response.json();
          setApiResponse(json["detail"]);
        }
      } catch (error) {
        setApiResponse(error);
        setLoading(false);
        console.log(error);
      }
    }
  };

  return {
    register,
    login,
    sendResetEmail,
    ResetPassword,
    loading,
    apiResponse,
    setApiResponse,
    wrongPassword,
  };
}

export default useAuth;
