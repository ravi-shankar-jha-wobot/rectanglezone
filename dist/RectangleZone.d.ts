import { Rectangle } from './types';
type RectangleZoneProps = {
    imageSrc: string;
    rectangles: Rectangle[];
    onChange: ({ coordinates, }: {
        coordinates: Rectangle["coordinates"];
    }) => void;
};
declare const RectangleZone: ({ imageSrc, rectangles, onChange, }: RectangleZoneProps) => import("react/jsx-runtime").JSX.Element;
export { RectangleZone };
