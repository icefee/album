import { along, lineString } from '@turf/turf';

export const getLocate = (coordinates, distance) => {
    let locates = coordinates.map(({ lng, lat }) => [lng, lat]);
    let line = lineString(locates);
    var segment = along(line, distance);
    let [lng, lat] = segment.geometry.coordinates;
    return { lng, lat }
}
