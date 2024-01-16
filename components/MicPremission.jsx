import { useEffect } from "react";

const MicPremission = ({ handlePremissionAccepted }) => {
  const requestMicrophoneAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Do something with the stream here if needed
      handlePremissionAccepted();
    } catch (err) {
      console.error("Microphone access was denied", err);
    }
  };

  // Use useEffect to call the function when the component mounts
  useEffect(() => {
    requestMicrophoneAccess();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <p>
        Please allow microphone access to continue. You will be asked to allow
        access again after you press the start button.
      </p>
      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={requestMicrophoneAccess}
      >
        Allow Access
      </button>
    </div>
  );
};

export default MicPremission;
