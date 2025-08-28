import { useRef } from "react";
import type { Rectangle } from "./types";
import { useHandlers } from "./hooks/useHandlers";
import "./StyleRectangleZone.css";
import { useDrawSavedRectangles } from "./hooks/useDrawSavedRectangles";

type RectangleZoneProps = {
  imageSrc: string;
  rectangles: Rectangle[];
  drawnRectangle: Rectangle | null;
  setDrawnRectangle: React.Dispatch<React.SetStateAction<Rectangle>>;
  onChange: ({
    coordinates,
  }: {
    coordinates: Rectangle["coordinates"];
  }) => void;
};
const RectangleZone = ({
  imageSrc,
  rectangles,
  drawnRectangle,
  setDrawnRectangle,
  onChange,
}: RectangleZoneProps) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // const [drawnRectangle, setDrawnRectangle] = useState<Rectangle>({
  //   name: "",
  //   color: "#3766E8",
  //   coordinates: [],
  // });

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
    setDrawnRectangle,
    drawSavedRectangles,
    onChange,
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
        alt="rect-background"
        className="rectangle_zone_image"
        onLoad={handleImgLoad}
        crossOrigin="anonymous"
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

export { RectangleZone };
