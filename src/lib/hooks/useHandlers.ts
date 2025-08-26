import { useCallback, useRef } from "react";
import type { Rectangle, Coordinate } from "../types";
import {
  clearAndDrawBackground,
  drawRectangle,
  getCanvasCoordinates,
} from "../utils";

type UseHandlersProps = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  imgRef: React.RefObject<HTMLImageElement | null>;
  drawnRectangle: Rectangle;
  savedRectangles: Rectangle[];
  setSavedRectangles: React.Dispatch<React.SetStateAction<Rectangle[]>>;
  setDrawnRectangle: React.Dispatch<React.SetStateAction<Rectangle>>;
  drawSavedRectangles: () => void;
};

export const useHandlers = ({
  canvasRef,
  imgRef,
  drawnRectangle,
  savedRectangles,
  setSavedRectangles,
  setDrawnRectangle,
  drawSavedRectangles,
}: UseHandlersProps) => {
  const isDrawingRef = useRef(false);
  const startPointRef = useRef<Coordinate>({ x: 0, y: 0 });

  // Helper function to draw rectangle on canvas
  //   const drawRectangle = useCallback(
  //     (
  //       startPoint: Coordinate,
  //       endPoint: Coordinate,
  //       color: string = "#3766E8"
  //     ) => {
  //       const canvas = canvasRef.current;
  //       const img = imgRef.current;

  //       if (!canvas || !img) return;

  //       const ctx = canvas.getContext("2d");
  //       if (!ctx) return;

  //       // Clear the canvas
  //       ctx.clearRect(0, 0, canvas.width, canvas.height);

  //       // Draw all saved rectangles
  //       savedRectangles.forEach((rectangle) => {
  //         if (rectangle.coordinates.length >= 4) {
  //           const [topLeft, , bottomRight] = rectangle.coordinates;
  //           ctx.strokeStyle = rectangle.color || "#3766E8";
  //           ctx.lineWidth = 2;
  //           ctx.strokeRect(
  //             topLeft.x,
  //             topLeft.y,
  //             bottomRight.x - topLeft.x,
  //             bottomRight.y - topLeft.y
  //           );
  //         }
  //       });

  //       // Draw current rectangle being drawn
  //       const width = endPoint.x - startPoint.x;
  //       const height = endPoint.y - startPoint.y;

  //       ctx.strokeStyle = color;
  //       ctx.lineWidth = 2;
  //       ctx.strokeRect(startPoint.x, startPoint.y, width, height);
  //     },
  //     [canvasRef, imgRef, savedRectangles]
  //   );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const coordinates = getCanvasCoordinates({
        canvas: canvasRef.current,
        e,
      });

      isDrawingRef.current = true;
      startPointRef.current = coordinates;

      // Initialize the drawn rectangle
      setDrawnRectangle({
        name: `Rectangle ${savedRectangles.length + 1}`,
        color: "#3766E8",
        coordinates: [coordinates, coordinates, coordinates, coordinates],
      });
    },
    [setDrawnRectangle, savedRectangles.length, canvasRef]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawingRef.current) return;
      const canvas = canvasRef.current;
      const img = imgRef.current;

      if (!canvas || !img) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const currentPoint = getCanvasCoordinates({
        canvas: canvasRef.current,
        e,
      });
      const startPoint = startPointRef.current;

      // Calculate all four corners of the rectangle
      const topLeft: Coordinate = {
        x: Math.min(startPoint.x, currentPoint.x),
        y: Math.min(startPoint.y, currentPoint.y),
      };
      const topRight: Coordinate = {
        x: Math.max(startPoint.x, currentPoint.x),
        y: Math.min(startPoint.y, currentPoint.y),
      };
      const bottomRight: Coordinate = {
        x: Math.max(startPoint.x, currentPoint.x),
        y: Math.max(startPoint.y, currentPoint.y),
      };
      const bottomLeft: Coordinate = {
        x: Math.min(startPoint.x, currentPoint.x),
        y: Math.max(startPoint.y, currentPoint.y),
      };

      // Update the drawn rectangle coordinates with all four corners
      setDrawnRectangle((prev) => ({
        ...prev,
        coordinates: [topLeft, topRight, bottomRight, bottomLeft],
      }));
      //   drawSavedRectangles

      // Draw the rectangle on canvas
      //   drawRectangle(topLeft, bottomRight, drawnRectangle.color || "#3766E8");
      // Clear the canvas

      clearAndDrawBackground({
        ctx,
        canvas,
        img,
      });
      drawSavedRectangles();
      drawRectangle({
        canvasRef,
        imgRef,
        rectangle: {
          name: drawnRectangle.name,
          color: drawnRectangle.color,
          coordinates: [topLeft, topRight, bottomRight, bottomLeft],
        },
      });
    },
    [
      drawSavedRectangles,
      canvasRef,
      setDrawnRectangle,
      drawnRectangle.color,
      drawnRectangle.name,
      imgRef,
    ]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDrawingRef.current) return;

    isDrawingRef.current = false;

    // Only save the rectangle if it has meaningful dimensions
    if (drawnRectangle.coordinates.length === 4) {
      const [topLeft, , bottomRight] = drawnRectangle.coordinates;
      const width = Math.abs(bottomRight.x - topLeft.x);
      const height = Math.abs(bottomRight.y - topLeft.y);

      if (width > 5 && height > 5) {
        setSavedRectangles((prev) => [...prev, drawnRectangle]);
      }
    }

    // Reset the drawn rectangle
    setDrawnRectangle({
      name: "",
      color: "#3766E8",
      coordinates: [],
    });
  }, [drawnRectangle, setSavedRectangles, setDrawnRectangle]);

  return {
    handleMouseMove,
    handleMouseUp,
    handleMouseDown,
  };
};
