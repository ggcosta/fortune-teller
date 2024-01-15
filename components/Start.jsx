import { useRef } from 'react';
import Image from "next/image";

const Start = ({ handleStart }) => {
  const timer = useRef(null);

  const handleMouseDown = () => {
    timer.current = setTimeout(handleStart, 1000);
  };

  const handleMouseUp = () => {
    clearTimeout(timer.current);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      <button
        style={{
          border: "none",
          background: "none",
          padding: 0,
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <Image
          src="/images/hand_placement.png"
          alt="Button Image"
          width={600}
          height={600}
          priority
        />
      </button>
      <p>Place your hand in the area above to start</p>
    </div>
  );
};

export default Start;