const ak = 'E4805d16520de693a3fe707cdc962045';

var map = null;

export const getMap = () => {
    return map;
}

export const init = (id, option) => {
    return new Promise(resolve => {
        loadJs(() => {
            createMap(id, option);
            resolve(map)
        })
    })
}

const loadJs = callback => {
    /* global BMap */
    if(window.BMap) {
        callback()
    }
    else {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `http://api.map.baidu.com/getscript?v=2.0&ak=${ak}&services=&t=20190123111209`;
        document.head.appendChild(script);
        script.onload = callback;
    }
}

const createMap = (id, option) => {
    /* global BMap */
    map = new BMap.Map(id, { enableMapClick: false });
    map.enableScrollWheelZoom(true);
    let offset = new BMap.Size(20, 20);
    /* global BMAP_ANCHOR_TOP_LEFT */
    let navigationControl = new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        offset
    });
    map.addControl(navigationControl);
    /* global BMAP_ANCHOR_BOTTOM_RIGHT */
    map.addControl(new BMap.ScaleControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
        offset
    }));
    map.setMapStyle({ style: 'googlelite' });
    map.addControl(new BMap.MapTypeControl());
    setPosition(option);
    return map;
}

export const setPosition = option => {
    let { lng, lat, zoom } = option;
    let point = createPoint(lng, lat);
    map.centerAndZoom(point, zoom);
}

export const setMapStyle = style => {
    map.setMapStyle({ style });
}

const createSize = (width, height) => {
    return new BMap.Size(width, height);
}

const createIcon = (icon, { width, height }, opts) => {
    return new BMap.Icon(icon, createSize(width, height), opts);
}

const createLabel = content => {
    return new BMap.Label(content, { offset: createSize(-3, 45) });
}

const createPoint = (lng, lat) => {
    return new BMap.Point(lng, lat);
}

export const locationsToPoints = points => {
    return points.map(
        ({ lng, lat }) => createPoint(lng, lat)
    )
}

export const bindEvent = (ev, target, callback) => {
    let tar = target || map;
    tar.addEventListener(ev, callback)
}

export const removeEvent = (ev, target, callback) => {
    let tar = target || map;
    tar.removeEventListener(ev, callback)
}

export const getDistance = (start, end) => {
    return map.getDistance(createPoint(start.lng, start.lat), createPoint(end.lng, end.lat));
}

const createCustomMarker = (lng, lat, icon, show = true) => {
    let point = createPoint(lng, lat);
    let marker = new BMap.Marker(point, { icon });
    marker.id = Date.now();
    if(!show) marker.hide();
    map.addOverlay(marker);
    return marker;
}

export const registerMenu = (menus, target) => {
    let menu = new BMap.ContextMenu();
    menus.forEach(d => {
        if(d && d.name) {
            menu.addItem(new BMap.MenuItem(d.name, d.callback))
        }
        else menu.addSeparator()
    })
    let tar = target || map;
    tar.addContextMenu(menu);
}

export const setLabel = (marker, content) => {
    let label = marker.getLabel();
    if(label) {
        label.setContent(content);
    }
    else {
        marker.setLabel(createLabel(content));
    }
    return label;
}

export const createPileMarker = (lng, lat, label) => {
    let isExist = isMarkerOnMap(lng, lat);
    if(isExist) {
        removeMarker(isExist)
    }
    let icon = createIcon(require('./icons/spotlight_pin_v2_accent-1-small.png'), { width: 25, height: 44 }, {
        anchor: createSize(13, 40)
    });
    let marker = createCustomMarker(lng, lat, icon);
    setLabel(marker, label);
    /* global BMAP_ANIMATION_DROP */
    marker.setAnimation(BMAP_ANIMATION_DROP);
    return marker;
}

const isMarkerOnMap = (lng, lat) => {
    let overlays = map.getOverlays();
    let filter = overlays.filter(d => d.point && d.point.lng == lng && d.point.lat == lat);
    return filter.length ? filter[0] : null;
}

export const removeMarker = marker => {
    map.removeOverlay(marker);
    map.removeEventListener('click');
}

export const makePoints = points => {
    return points.map(({ lng, lat }) => createPoint(lng, lat));
}

export const drawLine = (points, color) => {
    let strokeColor = color || 'red';
    let polyline = new BMap.Polyline(points, {
        strokeColor,
        strokeWeight: 4,
        strokeOpacity: .8,
        enableMassClear: false,
    })
    map.addOverlay(polyline);
    return polyline;
}

export const drawZone = (points, color) => {
    let line = drawLine(makePoints(points), color);
    return line;
}

export const clearOverlays = () => {
    return map.clearOverlays()
}

const showInfoWindow = (info, target) => {
    let { lng, lat } = target.getPosition();
    map.openInfoWindow(info, createPoint(lng, lat));
}

const isOpenInfoWindowOnMarker = (lng, lat) => {
    let infoWindow = map.getInfoWindow();
    if(!infoWindow) {
        return null;
    }
    else {
        let point = infoWindow.getPosition();
        if(point.lng == lng && point.lat == lat) {
            return infoWindow;
        }
        else {
            return null;
        }
    }
}

export const createAlarmMarker = (lng, lat, { level }) => {
    let marker = isMarkerOnMap(lng, lat);
    let icon = createIcon(require('./icons/icon_' + level + '.png'), { width: 28, height: 39 }, {
        anchor: createSize(13, 36)
    });
    if(marker) {
        if(marker.level != level) {
            marker.setIcon(icon);
            marker.level = level;
        }
    }
    else {
        marker = createCustomMarker(lng, lat, icon);
        marker.isAlarm = true;
        marker.level = level;
    }
    return marker;
}

const createInfoWindow = ({ title, content, width, height }) => {
    let infoWindow = new BMap.InfoWindow(content, {
        width,
        height,
        title,
        enableMessage: false,
        // enableAutoPan: ALARM_INFO_WINDOW_ADJUST
    });
    return infoWindow;
}

const setInfoWindow = (info, { title, content }) => {
    let infoWindow = info;
    // infoWindow.setHeight(height);
    infoWindow.setTitle(title);
    infoWindow.setContent(content);
    infoWindow.redraw();
    // level > 100 ? 200 : 320
    return infoWindow;
}

export const createAlarmInfoWindow = (option, { ID, lng, lat, level, autoShow }, callbacks) => {
    let alarmInfo = createInfoWindow(option);
    let isExist = isMarkerOnMap(lng, lat);
    let marker = createAlarmMarker(lng, lat, { level });
    if(!isExist) {
        marker.ID = [ID];
        bindEvent('click', marker, e => {
            showInfoWindow(alarmInfo, e.target);
        })
        if (callbacks && callbacks.clear) {
            bindEvent('rightclick', marker, e => {
                callbacks.clear(marker.ID, res => {
                    if(res) {
                        marker.removeEventListener('click');
                        marker.removeEventListener('rightclick');
                        if(isOpenInfoWindowOnMarker(lng, lat)) {
                            map.closeInfoWindow();
                        }
                        map.removeOverlay(marker);
                    }
                })
            })
        }
    }
    else {
        marker.ID.push(ID);
    }
    /* global BMAP_ANIMATION_BOUNCE */
    marker.setAnimation(BMAP_ANIMATION_BOUNCE);
    setTimeout(() => {
        marker.setAnimation(null)
    }, 5000)

    if(autoShow) {
        let infoWindow = isOpenInfoWindowOnMarker(lng, lat);
        if(infoWindow) {
            setInfoWindow(infoWindow, option);
        }
        else {
            showInfoWindow(alarmInfo, marker);
        }
        let curZoom = map.getZoom();
        setPosition({ lng, lat, zoom: curZoom });
    }
}
