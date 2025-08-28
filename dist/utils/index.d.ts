import { ClearAndDrawBackgroundParams, Rectangle } from '../types';
export declare const getCanvasCoordinates: ({ canvas, e, }: {
    canvas: HTMLCanvasElement | null;
    e: React.MouseEvent<HTMLCanvasElement>;
}) => {
    x: number;
    y: number;
};
export declare const drawRectangle: ({ canvasRef, imgRef, rectangle, }: {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    imgRef: React.RefObject<HTMLImageElement | null>;
    rectangle: Rectangle;
}) => void;
export declare const clearAndDrawBackground: ({ ctx, canvas, img, }: ClearAndDrawBackgroundParams) => void;
//# sourceMappingURL=index.d.ts.map