export type Coordinate = {
    x: number;
    y: number;
};
export type Rectangle = {
    name: string;
    color?: string;
    coordinates: Coordinate[];
};
export type ClearAndDrawBackgroundParams = {
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    img: HTMLImageElement;
};
