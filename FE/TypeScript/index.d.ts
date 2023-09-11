interface Point {
    x: number;
    y: number;
}

type FomartPoint = (point: Point) => void;

declare let count: number;
declare let songName: string;
declare let position: Point;

declare function add(x: number, y: number): number;

declare function cheangeDirection(direction: 'up' | 'down' | 'left' | 'right'): void;

declare const fomartPoint: FomartPoint;

/**
 * 类型提供好以后，需要使用 模块化方案 中提供的模块化语法，来导出声明好的类型。
 * 才能在其他的 .ts 文件中使用。
 */
export { count, songName, position, add, cheangeDirection, fomartPoint };
