import { useRef, useState } from "react";
import type { Rectangle } from "./types";
import { useHandlers } from "./hooks/useHandlers";
import "./StyleRectangleZone.css";
import { useDrawSavedRectangles } from "./hooks/useDrawSavedRectangles";

type RectangleZoneProps = {
  imageSrc: string;
  rectangles: Rectangle[];
  setRectangles: React.Dispatch<React.SetStateAction<Rectangle[]>>;
};
const RectangleZone = ({
  imageSrc,
  rectangles,
  setRectangles,
}: RectangleZoneProps) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [drawnRectangle, setDrawnRectangle] = useState<Rectangle>({
    name: "",
    color: "#3766E8",
    coordinates: [],
  });

  const { drawSavedRectangles } = useDrawSavedRectangles({
    canvasRef,
    imgRef,
    rectangles,
    scale: 1,
  });

  const { handleMouseDown, handleMouseMove, handleMouseUp } = useHandlers({
    canvasRef,
    imgRef,
    drawnRectangle,
    savedRectangles: rectangles,
    setSavedRectangles: setRectangles,
    setDrawnRectangle,
    drawSavedRectangles,
  });

  const handleImgLoad = () => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (img && canvas) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
    }
  };

  return (
    <div className="rectangle_zone_wrapper">
      <img
        ref={imgRef}
        src={imageSrc}
        alt="background"
        className="rectangle_zone_image"
        onLoad={handleImgLoad}
      />
      <canvas
        ref={canvasRef}
        className="rectangle_zone_canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};

export default RectangleZone;
