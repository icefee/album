declare type Locate = {
    lng: number;
    lat: number;
};
export function getLocate(coordinates: Locate[], distance: number): Locate;
