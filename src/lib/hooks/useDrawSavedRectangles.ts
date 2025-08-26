import { useCallback, useEffect } from "react";
import type { Rectangle } from "../types";
import { clearAndDrawBackground, drawRectangle } from "../utils";

type useDrawSavedRectanglesProps = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  imgRef: React.RefObject<HTMLImageElement | null>;
  rectangles: Rectangle[];
  scale: number;
};

export function useDrawSavedRectangles({
  canvasRef,
  imgRef,
  rectangles,
  scale,
}: useDrawSavedRectanglesProps) {
  const drawSavedRectangles = useCallback(() => {
    rectangles.forEach((rectangle) => {
      drawRectangle({
        canvasRef,
        imgRef,
        rectangle,
      });
    });
  }, [rectangles, canvasRef, imgRef]);
  useEffect(() => {
    const canvas = canvasRef?.current;
    const ctx = canvas?.getContext("2d");
    const img = imgRef.current;
    if (!canvas || !ctx || !img) return;

    // Clear canvas and draw background image
    clearAndDrawBackground({ ctx, canvas, img });

    // Draw existing rectangles
    drawSavedRectangles();
  }, [canvasRef, imgRef, rectangles, scale, drawSavedRectangles]);

  return { drawSavedRectangles };
}
