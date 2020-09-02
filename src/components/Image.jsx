import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { CircularProgress } from "@material-ui/core";

const Image = ({ imgPath, rect, speedLimit }) => {
  // Rect refers to box that outlines the speed limit sign in the image
  const imgRef = useRef(null);
  const [adjustedRect, adjustRect] = useState(rect);

  const [isLoading, setIsLoading] = useState(true);
  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  // We have to wait until image has rendered to DOM before
  // calculating size of rectangle and setting height of grid cell
  const handleImgResize = useCallback(() => {
    if (!isLoading && rect && imgRef && imgRef.current) {
      const newRect = [
        parseInt(rect[0]) *
          (imgRef.current.offsetHeight / imgRef.current.naturalHeight),
        parseInt(rect[1]) *
          (imgRef.current.offsetWidth / imgRef.current.naturalWidth),
        parseInt(rect[2]) *
          (imgRef.current.offsetWidth / imgRef.current.naturalWidth),
        parseInt(rect[3]) *
          (imgRef.current.offsetHeight / imgRef.current.naturalHeight),
      ];
      adjustRect(newRect.map((val) => val.toString() + "px"));
    }
  }, [isLoading, rect]);

  const rectStyle = useMemo(() => {
    return rect && imgRef && imgRef.current
      ? {
          position: "absolute",
          top: adjustedRect[0],
          left: adjustedRect[1],
          width: adjustedRect[2],
          height: adjustedRect[3],
          border: "1px solid red",
          backgroundColor: "transparent",
        }
      : null;
  }, [adjustedRect, rect]);

  const imgStyle = isLoading
    ? { display: "none" }
    : { objectFit: "cover", width: "100%" };

  const divStyle = {
    backgroundSize: "cover",
    width: "100%",
  };

  // Add a resize event listener so rect is recalculated to right position
  useEffect(() => {
    handleImgResize();
    window.addEventListener("resize", handleImgResize);
    return () => {
      window.removeEventListener("resize", handleImgResize);
    };
  }, [handleImgResize]);

  return (
    <>
      <div style={divStyle}>
        {isLoading && <CircularProgress />}
        <img
          ref={imgRef}
          alt={`Sign showing speed limit of ${speedLimit}`}
          src={imgPath}
          style={imgStyle}
          onLoad={handleImageLoad}
        />
        <div style={rectStyle}></div>
      </div>
    </>
  );
};

export default Image;
