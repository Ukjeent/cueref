import { useRef, useState } from "react";


function useFileUpload({sendFormData, data, setData, isProcessing, setFilenames, frames}) {

    
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

  //   function handleClick() {

      
  //   if (data?.length === 0 && isProcessing === false) {
  //     setFilenames("No files uploaded");
  //   } else if (isProcessing === true) {
  //     setFilenames(
  //       "Still processing " + data?.length + " file(s)... - please wait"
  //     );
  //   }


  //   if (fileInputRef.current) {
      
  //     if (data?.length === 1) {
  //       const formData = createFormData(data);
  //       sendFormData(formData);
  //       setFilenames("Processing " + data?.length + " file...");
  //       fileInputRef.current.value = "";
  //     } else if (data?.length > 1) {
  //       const formData = createFormData(data);
  //       sendFormData(formData);
  //       setFilenames("Processing " + data?.length + " file(s)...");
  //       fileInputRef.current.value = "";
  //     }
  //   }


  // }


  function handleClick() {
  // Case 1: No files selected
  if (!data || data?.length === 0) {
    setFilenames("No files uploaded");
    return; // Stop here - don't try to upload
  }

  // Case 2: Already processing
  if (isProcessing) {
    setFilenames(`Still processing ${data.length} file(s)... - please wait`);
    return; // Don't start another upload
  }

  // Case 3: Ready to upload
  if (fileInputRef.current && data?.length > 0) {
    const formData = createFormData(data);
    sendFormData(formData);
    setFilenames(`Processing ${data.length} file(s)...`);
    fileInputRef.current.value = "";
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
    files.value = null; // Reset the input value
  }


  return {
    handleClick,
    handleFileChange,
    data,
    fileInputRef,
  };
}
export default useFileUpload ;
