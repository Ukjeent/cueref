import { useEffect, useState } from "react";

function useProcessingDisplay(
  isProcessing,
  setFilenames,
  data,
  songCount,
  estimatedSeconds,
  processingReady
) {
  const [animationTime, setAnimationTime] = useState(60);
  const [estimatedMinutes, setEstimatedMinutes] = useState(0);
  const [processingInfo, setProcessingInfo] = useState("");
  const [songCountReady, setSongCountReady] = useState(false);
  const [fileCount, setFileCount] = useState(0);

  useEffect(() => {
    if (isProcessing && songCount) {
      const estimatedMinutes = Math.ceil(estimatedSeconds / 60);
      setAnimationTime(estimatedSeconds);
      setEstimatedMinutes(estimatedMinutes);
      if (!processingReady) {
        setFilenames(
          `Processing ${data?.length} file(s) and ${songCount} songs`
        );
        setFileCount(data?.length);
      }
      setProcessingInfo(
        `Estimated time: ${
          estimatedSeconds >= 60
            ? estimatedMinutes + " minutes"
            : estimatedSeconds + " seconds"
        } on our development server during beta testing`
      );
      setSongCountReady(true);
    }
  }, [
    songCount,
    isProcessing,
    estimatedSeconds,
    estimatedMinutes,
    data?.length,
  ]);

  useEffect(() => {
    if (processingReady) {
      setAnimationTime(1);
      setFilenames(`Processed ${fileCount} file(s) and ${songCount} songs`);
      setProcessingInfo(
        "Processing complete! You can now download the results."
      );
    }
  }, [processingReady]);

  return {
    animationTime,
    processingInfo,
    songCountReady,
  };
}
export default useProcessingDisplay;
