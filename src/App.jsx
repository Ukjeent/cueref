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

function App() {
  return (
    <>
      <Header />
      <main style={{ padding: " 0 2rem" }}>
        <h1>Welcome to CueRef</h1>
        <UploadSection />
        <SummarySection />
        <TableSection />
        <DownloadSection />
        <SupportedLibraries />
      </main>
    </>
  );
}
export default App;
