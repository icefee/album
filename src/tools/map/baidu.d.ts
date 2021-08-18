declare type BMap = any;
declare var map: BMap;
declare type Option = {
    lng: number;
    lat: number;
    zoom: number;
};
declare type Point = {
    lng: number;
    lat: number;
};
export function getMap(): BMap;
export function init(id: string, option: Option): BMap;
export function setPosition(option: Option): void;
export function setMapStyle(style: any): void;
export function locationsToPoints(points: Point[]): any[];
