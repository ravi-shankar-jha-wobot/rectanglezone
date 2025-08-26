import type { ClearAndDrawBackgroundParams, Rectangle } from "../types";

export const getCanvasCoordinates = ({
  canvas,
  e,
}: {
  canvas: HTMLCanvasElement | null;
  e: React.MouseEvent<HTMLCanvasElement>;
}) => {
  if (!canvas) return { x: 0, y: 0 };

  const rect = canvas.getBoundingClientRect();
  // Calculate the scale based on actual canvas size vs display size
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const x = (e.clientX - rect.left) * scaleX;
  const y = (e.clientY - rect.top) * scaleY;
  return { x, y };
};

export const drawRectangle = ({
  canvasRef,
  imgRef,
  rectangle,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  imgRef: React.RefObject<HTMLImageElement | null>;
  rectangle: Rectangle;
}) => {
  const canvas = canvasRef.current;
  const img = imgRef.current;

  if (!canvas || !img) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Draw all saved rectangles
  if (rectangle.coordinates.length >= 4) {
    const [topLeft, , bottomRight] = rectangle.coordinates;
    ctx.strokeStyle = rectangle.color || "#3766E8";
    ctx.lineWidth = 2;
    ctx.strokeRect(
      topLeft.x,
      topLeft.y,
      bottomRight.x - topLeft.x,
      bottomRight.y - topLeft.y
    );
  }
};

export const clearAndDrawBackground = ({
  ctx,
  canvas,
  img,
}: ClearAndDrawBackgroundParams) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};
