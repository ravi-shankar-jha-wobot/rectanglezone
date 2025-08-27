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
  drawnRectangle: Rectangle | null;
  savedRectangles: Rectangle[];
  setDrawnRectangle: React.Dispatch<React.SetStateAction<Rectangle>>;
  drawSavedRectangles: () => void;
  onChange: () => void;
};

export const useHandlers = ({
  canvasRef,
  imgRef,
  drawnRectangle,
  savedRectangles,
  setDrawnRectangle,
  drawSavedRectangles,
  onChange,
}: UseHandlersProps) => {
  const isDrawingRef = useRef(false);
  const startPointRef = useRef<Coordinate>({ x: 0, y: 0 });

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
      if (
        !isDrawingRef.current ||
        typeof setDrawnRectangle !== "function" ||
        !drawnRectangle
      ) {
        return;
      }
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

      if (typeof onChange === "function") {
        onChange();
      }

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
      drawnRectangle,
      drawSavedRectangles,
      canvasRef,
      setDrawnRectangle,
      imgRef,
      onChange,
    ]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDrawingRef.current) return;

    isDrawingRef.current = false;
  }, []);

  return {
    handleMouseMove,
    handleMouseUp,
    handleMouseDown,
  };
};
