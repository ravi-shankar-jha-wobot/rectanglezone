import { Rectangle } from '../types';
type useDrawSavedRectanglesProps = {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    imgRef: React.RefObject<HTMLImageElement | null>;
    rectangles: Rectangle[];
    scale: number;
};
export declare function useDrawSavedRectangles({ canvasRef, imgRef, rectangles, scale, }: useDrawSavedRectanglesProps): {
    drawSavedRectangles: () => void;
};
export {};
