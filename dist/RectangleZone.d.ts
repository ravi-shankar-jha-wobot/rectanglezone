import { Rectangle } from './types';
type RectangleZoneProps = {
    imageSrc: string;
    rectangles: Rectangle[];
    drawnRectangle: Rectangle | null;
    setDrawnRectangle: React.Dispatch<React.SetStateAction<Rectangle>>;
    onChange: ({ coordinates, }: {
        coordinates: Rectangle["coordinates"];
    }) => void;
};
declare const RectangleZone: ({ imageSrc, rectangles, drawnRectangle, setDrawnRectangle, onChange, }: RectangleZoneProps) => import("react/jsx-runtime").JSX.Element;
export { RectangleZone };
