import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useAuthContext } from "./contexts/AuthContext";

import Home from "./components/pages/Home";
import About from "./components/pages/About";
import MyAccount from "./components/pages/MyAccount";
import TermsAndConditions from "./components/pages/TermsAndConditions";

import Header from "./components/ui/Header";
import FooterSection from "./components/ui/FooterSection";
import LoginModal from "./components/ui/LoginModal";
import ErrorModal from "./components/ui/ErrorModal";

function App() {
  const [error, setError] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [errorModalShow, setErrorModalShow] = useState(false);

  const handleLoginClick = () => setModalShow(true);

  return (
    <div className="app-container">
      <Header handleLoginClick={handleLoginClick} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setModalShow={setModalShow}
              setErrorModalShow={setErrorModalShow}
              error={error}
              setError={setError}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/myaccount"
          element={<MyAccount handleLoginClick={handleLoginClick} />}
        />

        <Route path="/termsandconditions" element={<TermsAndConditions />} />
      </Routes>
      <FooterSection handleLoginClick={handleLoginClick} />
      <LoginModal modalShow={modalShow} setModalShow={setModalShow} />
      <ErrorModal
        error={error}
        errorModalShow={errorModalShow}
        setErrorModalShow={setErrorModalShow}
      />
    </div>
  );
}
export default App;
