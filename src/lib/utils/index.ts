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

  // Draw rectangle if it has enough coordinates
  if (rectangle.coordinates.length >= 4) {
    const [topLeft, , bottomRight] = rectangle.coordinates;
    const color = rectangle.color || "#3766E8";

    // Calculate rectangle dimensions
    const width = bottomRight.x - topLeft.x;
    const height = bottomRight.y - topLeft.y;

    // Save current context state
    ctx.save();

    // Draw filled rectangle with opacity
    ctx.globalAlpha = 0.2; // 20% opacity for fill
    ctx.fillStyle = color;
    ctx.fillRect(topLeft.x, topLeft.y, width, height);

    // Reset opacity and draw stroke
    ctx.globalAlpha = 1.0; // Full opacity for stroke
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.strokeRect(topLeft.x, topLeft.y, width, height);

    // Restore context state
    ctx.restore();
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
