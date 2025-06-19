import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";
export { useState };
import Header from "./components/Header";
import UploadSection from "./components/UploadSection";
import DownloadSection from "./components/DownloadSection";
import SupportedLibraries from "./components/SupportedLibraries";
import SummarySection from "./components/SummarySection";
import TableSection from "./components/TableSection";
import WelcomeBanner from "./components/welcomeBanner";

function App() {
  return (
    <>
      <Header />
        <main>
        <WelcomeBanner />
        <div className="upload-result-container">
        <UploadSection />
        {/* <div className="result-section" style={{ display: "none" }}> */}
        <div className="result-section" >
        <SummarySection />
        <TableSection />
        <DownloadSection />
        </div>
        </div>
        <SupportedLibraries />
      </main>
    </>
  );
}
export default App;
