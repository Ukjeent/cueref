import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";

import Header from "./components/Header";
import UploadSection from "./components/UploadSection";
import DownloadSection from "./components/DownloadSection";
import SupportedLibraries from "./components/SupportedLibraries";
import SummarySection from "./components/SummarySection";
import TableSection from "./components/TableSection";
import WelcomeBanner from "./components/welcomeBanner";
import useFormData from "./hooks/useSendFormData";

function App() {
  const [showUploadSection, setShowUploadSection] = useState(false);
  const {
    sendFormData,
    isProcessing,
    processingReady,
    estimatedSeconds,
    summaryData,
    error,
    songCount,
    songData,
  } = useFormData();

  const handleShowUploadSectionClick = () => {
    setShowUploadSection(true);
  };

  return (
    <>
      <Header />
      <main>
        <WelcomeBanner
          handleShowUploadSectionClick={handleShowUploadSectionClick}
        />
        <div className="upload-result-container">
          {showUploadSection && (
            <UploadSection
              sendFormData={sendFormData}
              error={error}
              songCount={songCount}
              isProcessing={isProcessing}
              estimatedSeconds={estimatedSeconds}
              processingReady={processingReady}
            />
          )}
          {processingReady && (
            <div className="result-section">
              <SummarySection summaryData={summaryData} />
              <TableSection
                songData={songData}
                processingReady={processingReady}
              />
              <DownloadSection />
            </div>
          )}
        </div>
        <SupportedLibraries />
      </main>
    </>
  );
}
export default App;
