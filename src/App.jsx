import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useAuthContext } from "./contexts/AuthContext";

import Home from "./components/pages/Home";
import About from "./components/pages/About";
import TermsAndConditions from "./components/pages/TermsAndConditions";

import Header from "./components/ui/Header";
import FooterSection from "./components/ui/FooterSection";
import LoginModal from "./components/ui/LoginModal";

function App() {
  const [modalShow, setModalShow] = useState(false);

  const handleLoginClick = () => setModalShow(true);

  return (
    <div className="app-container">
      <Header handleLoginClick={handleLoginClick} />
      <Routes>
        <Route path="/" element={<Home setModalShow={setModalShow} />} />
        <Route path="/about" element={<About />} />
        <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
      </Routes>
      <FooterSection handleLoginClick={handleLoginClick} />
      <LoginModal modalShow={modalShow} setModalShow={setModalShow} />
    </div>
  );
}
export default App;
