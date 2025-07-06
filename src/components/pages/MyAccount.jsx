import React, { useState } from "react";
import "./MyAccount.css";
import { useAuthContext } from "../../contexts/AuthContext";
import Sidebar from "../ui/Sidebar";
import AccountInformation from "../ui/AccountInformation";
import PreviousUploads from "../ui/PreviousUploads";

const MyAccount = () => {
  const { userEmail, clearInfo, setClearInfo, isLoggedIn, userLogout } =
    useAuthContext();

  const [activeNav, setActiveNav] = useState("My page");

  const handleNavClick = (navItem) => {
    setActiveNav(navItem);
    console.log("Navigating to:", navItem);
  };

  return (
    <div className="account-container">
      {isLoggedIn ? (
        <>
          {/* Sidebar */}
          <Sidebar handleNavClick={handleNavClick} activeNav={activeNav} />
          {/* Main Content */}
          <main className="main-content">
            {/* Account Information */}
            {activeNav === "My page" ? (
              <AccountInformation />
            ) : activeNav === "Previous uploads" ? (
              <PreviousUploads />
            ) : (
              ""
            )}
          </main>
        </>
      ) : (
        "Please log in"
      )}
    </div>
  );
};

export default MyAccount;
