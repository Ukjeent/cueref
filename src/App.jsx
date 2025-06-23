import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";

import Header from "./components/Header";
import UploadSection from "./components/UploadSection";
import DownloadSection from "./components/DownloadSection";
import SupportedLibraries from "./components/SupportedLibraries";
import SummarySection from "./components/SummarySection";
import TableSection from "./components/TableSection";
import WelcomeBanner from "./components/WelcomeBanner";
import FooterSection from "./components/FooterSection";

import useFormData from "./hooks/useSendFormData";
import useFileUpload from "./hooks/useFileUpload";
import useProcessingDisplay from "./hooks/useProcessingDisplay";


function App() {
  const [data, setData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showUploadSection, setShowUploadSection] = useState(false);
  const [filenames, setFilenames] = useState("");
  const [frames, setFrames] = useState('25');
  const [processingReady, setProcessingReady] = useState(false);




  const {
    sendFormData,
    estimatedSeconds,
    summaryData,
    error,
    songCount,
    songData,
  } = useFormData(isProcessing, setIsProcessing, processingReady, setProcessingReady);

  const uploadConfig = { sendFormData, data, setData, isProcessing, setFilenames, frames};

  
  const {
    handleClick,
    handleFileChange,
    fileInputRef
  } = useFileUpload(uploadConfig);

  const {
    animationTime,
    processingInfo,
    songCountReady
  } = useProcessingDisplay(isProcessing, setFilenames, data, songCount, estimatedSeconds, processingReady)


  const handleShowUploadSectionClick = () => {
    setShowUploadSection(true);
  };

  return (
    <>
      <Header />
      <main>
        <WelcomeBanner
          handleShowUploadSectionClick={handleShowUploadSectionClick}
          showUploadSection={showUploadSection}
        />
        <div
          className={`
        upload-container
          ${showUploadSection ? "show" : ""}`}
        >
          {showUploadSection && (
            <UploadSection
              data={data}
              error={error}
              isProcessing={isProcessing}
              handleClick={handleClick}
              handleFileChange={handleFileChange}
              filenames={filenames}
              setFilenames={setFilenames}
              setFrames={setFrames}
              fileInputRef={fileInputRef}
              animationTime={animationTime}
              processingInfo={processingInfo}
              songCountReady={songCountReady}
            />
          )}
          <div className={`result-section ${processingReady ? "show" : ""}`}>
            <SummarySection
              summaryData={summaryData}
              processingReady={processingReady}
            />
            <TableSection
              songData={songData}
              processingReady={processingReady}
            />
            <DownloadSection />
          </div>
        </div>
        <SupportedLibraries />
      </main>
      <FooterSection />
    </>
  );
}
export default App;
