import { useRef, useState, useEffect } from "react";

const Start = ({ handleStart }) => {
  const [isPressed, setIsPressed] = useState(false);
  const circleRef = useRef(null);
  const timer = useRef(null);

  const handleMouseDown = () => {
    setIsPressed(true);
    timer.current = setTimeout(handleStart, 2000);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    clearTimeout(timer.current);
  };

  useEffect(() => {
    if (isPressed) {
      const startTime = Date.now();
      const id = setInterval(() => {
        const elapsed = Date.now() - startTime;
        if (elapsed > 2000) {
          clearInterval(id);
        } else {
          circleRef.current.setAttribute("r", (300 * elapsed) / 2000);
        }
      }, 20);
      return () => clearInterval(id);
    } else {
      circleRef.current.setAttribute("r", 0);
    }
  }, [isPressed]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
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
        <svg width="600" height="600">
          <circle
            cx="300"
            cy="300"
            r="300"
            stroke="black"
            strokeWidth="3"
            fill="transparent"
          />
          <circle
            ref={circleRef}
            cx="300"
            cy="300"
            r="0"
            stroke="green"
            strokeWidth="3"
            fill="green"
          />
        </svg>
      </button>
      <p>Place your hand in the area above to start</p>
    </div>
  );
};

export default Start;
