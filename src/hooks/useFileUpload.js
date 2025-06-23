import { useRef } from "react";


function useFileUpload({sendFormData, data, setData, isProcessing, setFilenames, frames}) {

    console.log('useFileUpload hook - current data:', data);  // ← Add this
    
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

    function handleClick() {
      console.log('handleClick called:', { 
        dataLength: data?.length, 
        isProcessing, 
        hasFiles: !!fileInputRef.current?.files?.length 
      });
    if (!data || data?.length === 0) {
      setFilenames("No files uploaded");
      return; // Don't continue with upload
    }
    if (fileInputRef.current) {
      if (data?.length === 1) {
        const formData = createFormData(data);
        sendFormData(formData);
        setFilenames("Processing " + data?.length + " file...");
        fileInputRef.current.value = "";
      } else if (data?.length> 1) {
        const formData = createFormData(data);
        sendFormData(formData);
        setFilenames("Processing " + data?.length + " file(s)...");
        fileInputRef.current.value = "";
      }
    }

    if (data?.length === 0 && isProcessing === false) {
      setFilenames("No files uploaded");
    } else if (isProcessing === true) {
      setFilenames(
        "Still processing " + data?.length + " file(s)... - please wait"
      );
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
    // files.value = null
  }


  return {
    handleClick,
    handleFileChange,
    data,
    fileInputRef
  };
}
export default useFileUpload ;
