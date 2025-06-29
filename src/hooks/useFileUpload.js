import { useRef, useState, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";

function useFileUpload({
  sendFormData,
  data,
  setData,
  isProcessing,
  setIsProcessing,
  setProcessingReady,
  setFilenames,
  frames,
  setModalShow,
}) {
  const { isLoggedIn } = useAuthContext();

  const fileInputRef = useRef(null);

  const createFormData = (files) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    const frameRate = frames;
    formData.append("frames", frameRate);
    return formData;
  };

  useEffect(() => {
    if (!isProcessing && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [isProcessing]);

  function handleClick() {
    if (isLoggedIn) {
      // Case 1: No files selected
      if (!data || data?.length === 0) {
        setFilenames("No files uploaded");
        return;
      }
      // Case 2: Already processing - check differently
      if (isProcessing) {
        // Don't start another upload and don't change the message
        return;
      }

      // Case 3: Ready to upload
      if (fileInputRef.current && data?.length > 0) {
        const formData = createFormData(data);
        setIsProcessing(true);
        setProcessingReady(false);
        sendFormData(formData);
        setFilenames(`Processing ${data?.length} file(s)...`);
        // fileInputRef.current.value = "";
      }
    } else {
      setModalShow(true);
    }
  }

  function handleFileChange(e) {
    let filenameStr = "";
    let filenameArr = [];
    let files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      filenameArr.push(files[i].name);
    }

    if (files.length === 1) {
      filenameStr = "Uploaded file: ";
    } else if (files.length > 1) {
      filenameStr = "Uploaded files: ";
    }

    for (let i = 0; i < filenameArr.length; i++) {
      if (i === e.target.files.length - 1) {
        filenameStr += filenameArr[i];
      } else {
        filenameStr += filenameArr[i] + " / ";
      }
    }
    setData(files);
    setFilenames(filenameStr);
    // files.value = null; // Reset the input value
  }

  return {
    handleClick,
    handleFileChange,
    data,
    fileInputRef,
  };
}
export default useFileUpload;
