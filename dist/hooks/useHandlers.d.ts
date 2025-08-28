import { Rectangle } from '../types';
type UseHandlersProps = {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    imgRef: React.RefObject<HTMLImageElement | null>;
    drawnRectangle: Rectangle | null;
    savedRectangles: Rectangle[];
    setDrawnRectangle: React.Dispatch<React.SetStateAction<Rectangle>>;
    drawSavedRectangles: () => void;
    onChange: ({ coordinates, }: {
        coordinates: Rectangle["coordinates"];
    }) => void;
};
export declare const useHandlers: ({ canvasRef, imgRef, drawnRectangle, savedRectangles, setDrawnRectangle, drawSavedRectangles, onChange, }: UseHandlersProps) => {
    handleMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
    handleMouseUp: () => void;
    handleMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void;
};
export {};
//# sourceMappingURL=useHandlers.d.ts.map