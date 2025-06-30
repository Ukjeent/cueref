import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState, useEffect } from "react";

// import { useAuthContext } from "./contexts/AuthContext";

import Header from "./components/ui/Header";
import FooterSection from "./components/ui/FooterSection";
import LoginModal from "./components/ui/LoginModal";

import UploadSection from "./components/forms/UploadSection";
import WelcomeBanner from "./components/forms/WelcomeBanner";

import DownloadSection from "./components/display/DownloadSection";
import SupportedLibraries from "./components/display/SupportedLibraries";
import SummarySection from "./components/display/SummarySection";
import TableSection from "./components/display/TableSection";

import useSendFormData from "./hooks/useSendFormData";
import useFileUpload from "./hooks/useFileUpload";
import useProcessingDisplay from "./hooks/useProcessingDisplay";

function App() {
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showUploadSection, setShowUploadSection] = useState(false);
  const [filenames, setFilenames] = useState("");
  const [frames, setFrames] = useState("25");
  const [processingReady, setProcessingReady] = useState(false);
  const [uploadId, setUploadId] = useState(null);
  const [error, setError] = useState(null);

  const { sendFormData, estimatedSeconds, summaryData, songCount, songData } =
    useSendFormData(
      isProcessing,
      setIsProcessing,
      processingReady,
      setProcessingReady,
      uploadId,
      setUploadId,
      setError,
      setModalShow
    );

  const uploadConfig = {
    sendFormData,
    data,
    setData,
    isProcessing,
    setIsProcessing,
    setProcessingReady,
    setFilenames,
    frames,
    setModalShow,
  };

  const { handleClick, handleFileChange, fileInputRef } =
    useFileUpload(uploadConfig);

  const { animationTime, processingInfo, songCountReady, noFiles } =
    useProcessingDisplay(
      isProcessing,
      setFilenames,
      data,
      songCount,
      estimatedSeconds,
      processingReady
    );

  const handleShowUploadSectionClick = () => {
    setShowUploadSection(true);
  };

  return (
    <div className="app-container">
      <Header setModalShow={setModalShow} />
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
              processingReady={processingReady}
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
            <DownloadSection
              uploadId={uploadId}
              processingReady={processingReady}
              error={error}
              setError={setError}
            />
          </div>
        </div>
        <SupportedLibraries />
      </main>
      <FooterSection />
      <LoginModal modalShow={modalShow} setModalShow={setModalShow} />
    </div>
  );
}
export default App;
