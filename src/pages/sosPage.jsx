import { useState, useRef } from "react";
import "./sosPage.css";

// Main SOS Page Component
const SosPage = () => {
  const [sosActive, setSosActive] = useState(false);
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [infoMessege, setInfoMessege] = useState("");
  const audioRef = useRef(null);
  const countdownRef = useRef(null);

  // Function to start the countdown on double-click
  const handleDoubleClick = () => {
    let i = 5; 
    setCountdownStarted(true); // Update state to show countdown has started

    countdownRef.current = setInterval(() => {
      if (i >= 0) {
        setCount(i); // Update count display
        i--;
      } else {
        clearInterval(countdownRef.current); // Stop countdown
        setCount("SOS Activated"); // Update button text
        setInfoMessege(
          "Your SOS has been activated. Contacting emergency services... and your family members"
        );
        setSosActive(true); // Mark SOS as active
        // playMusic(); // Optional: play alarm sound
        setCountdownStarted(false); // Reset countdown state
      }
    }, 1000); // Countdown runs every 1 second
  };

  // Optional: Function to play an emergency alarm sound
  // const playMusic = () => {
  //   audioRef.current = new Audio("./emergency-alarm-69780.mp3");
  //   audioRef.current.loop = true;
  //   audioRef.current.play();
  // };

  // Function to stop the SOS and reset all states
  const stopSos = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset audio
    }
    clearInterval(countdownRef.current); // Stop countdown interval
    setSosActive(false);
    setCountdownStarted(false);
    setCount("Under "); // Reset button text
    setInfoMessege(""); // Clear emergency message
  };

  return (
    <>
      {/* Page Header - Can be replaced with a Header component */}
      <div className="sos-header">
        <h2>This Feature Is Under Development</h2>
      </div>

      {/* Main SOS Section */}
      <div className="sos-container">
        <div className="div1">

          <button onDoubleClick={handleDoubleClick} className="sos_btn">
            Activate SOS
          </button>
        </div>

        {/* Title and Message */}
        <h2 className="div1-h2">SOS EMERGENCY</h2>
        <div className="infoMessege">{infoMessege}</div>

        {/* Stop Button - Visible when SOS is active or countdown is running */}
        {(sosActive || countdownStarted) && (
          <button className="stop_btn" onClick={stopSos}>
            ❌
          </button>
        )}
      </div>
    </>
  );
};

export default SosPage;

