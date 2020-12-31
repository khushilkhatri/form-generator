import React, { useRef } from "react";
import usePictureInPicture, { ExtendedHTMLVideoElement } from "react-use-pip";

const App = () => {
  const videoRef = useRef<ExtendedHTMLVideoElement | null>(null);
  const {
    isPictureInPictureActive,
    isPictureInPictureAvailable,
    togglePictureInPicture
  } = usePictureInPicture(videoRef, {
    onEnterPictureInPicture: e => console.log("enter picture in picture", e),
    onLeavePictureInPicture: e => console.log("leave picture in picture", e)
  });
  const handleClick = () => togglePictureInPicture(!isPictureInPictureActive);

  return (
    <>
      <div className="app">
        <video ref={videoRef} autoPlay muted controls loop>
          <source src="https://storage.googleapis.com/media-session/caminandes/short.mp4" />
        </video>
        {isPictureInPictureAvailable && (
          <button onClick={handleClick} className="control-button">
            {isPictureInPictureActive ? "Exit" : "Enter"} Picture in Picture
          </button>
        )}
      </div>
    </>
  );
};

export default App;
