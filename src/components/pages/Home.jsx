import "../../App.css";
import { useState, useEffect } from "react";

import { useAuthContext } from "../../contexts/AuthContext";

import UploadSection from "../forms/UploadSection";
import WelcomeBanner from "../forms/WelcomeBanner";

import DownloadSection from "../display/DownloadSection";
import SupportedLibraries from "../display/SupportedLibraries";
import SummarySection from "../display/SummarySection";
import TableSection from "../display/TableSection";

import useSendFormData from "../../hooks/useSendFormData";
import useFileUpload from "../../hooks/useFileUpload";
import useProcessingDisplay from "../../hooks/useProcessingDisplay";

import PaginationElement from "../ui/Pageination";

function Home({
  setModalShow,
  setCloseModal,
  setErrorModalShow,
  error,
  setError,
}) {
  const { clearInfo, setClearInfo, isLoggedIn } = useAuthContext();

  const [data, setData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showUploadSection, setShowUploadSection] = useState(false);
  const [filenames, setFilenames] = useState("");
  const [frames, setFrames] = useState("25");
  const [processingReady, setProcessingReady] = useState(false);
  const [uploadId, setUploadId] = useState(null);
  const [tryNowClick, setTryNowClick] = useState(false);
  const [pages, setPages] = useState(4);
  const [active, setActive] = useState(1);
  const [songRows, setSongRows] = useState(0);

  useEffect(() => {
    if (error) {
      setErrorModalShow(true);
    } else if (!error) {
      setErrorModalShow(false);
    }
  }, [error]);

  const {
    sendFormData,
    estimatedSeconds,
    summaryData,
    songCount,
    songData,
    fetch_songs,
  } = useSendFormData(
    isProcessing,
    setIsProcessing,
    processingReady,
    setProcessingReady,
    uploadId,
    setUploadId,
    setError,
    setModalShow,
    setPages,
    setSongRows
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

  // const handleLoginClick = () => setModalShow(true);

  const handleShowUploadSectionClick = () => {
    if (!isLoggedIn) {
      setCloseModal(false);
      setModalShow(true);
      setTryNowClick(true);
    } else if (isLoggedIn) {
      setTryNowClick(true);
    }
  };

  useEffect(() => {
    if (tryNowClick && isLoggedIn) {
      setShowUploadSection(true);
    }
  }, [tryNowClick, isLoggedIn]);

  return (
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
          <TableSection songData={songData} processingReady={processingReady} />
          <div className="download-pagination-container">
            {pages > 1 ? (
              <PaginationElement
                pages={pages}
                active={active}
                setActive={setActive}
                uploadId={uploadId}
                fetch_songs={fetch_songs}
                songRows={songRows}
              />
            ) : (
              ""
            )}
            <DownloadSection
              uploadId={uploadId}
              processingReady={processingReady}
              error={error}
              setError={setError}
            />
          </div>
        </div>
      </div>
      <SupportedLibraries />
    </main>
  );
}
export default Home;
