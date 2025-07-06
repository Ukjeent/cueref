import React, { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";

function PreviousUploads() {
  const { userEmail, clearInfo, setClearInfo, isLoggedIn, userLogout } =
    useAuthContext();

  return (
    <div>
      <div className="content-header">
        <h1 className="page-title">Previous uploads</h1>
      </div>
      <h4>Coming soon</h4>
    </div>
  );
}

export default PreviousUploads;
