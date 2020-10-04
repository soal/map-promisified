(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global['map-promisified'] = factory());
}(this, (function () { 'use strict';

    const composedMethodEvents = [
        { name: 'moveend', check: (map, options) => options.center && map.isMoving()
        },
        { name: 'zoomend', check: (map, options) => options.zoom !== undefined && options.zoom !== null && map.isZooming()
        },
        { name: 'rotateend', check: (map, options) => options.bearing !== undefined && options.bearing !== null && map.isRotating()
        },
        { name: 'pitchend', check: (map, options) => options.pitch !== undefined && options.bearing !== null && map.isMoving()
        }
    ];
    const composedMethodGetter = (map) => ({
        center: map.getCenter(),
        zoom: map.getZoom(),
        bearing: map.getBearing(),
        pitch: map.getPitch()
    });
    const composedMethodConfig = {
        events: composedMethodEvents,
        getter: composedMethodGetter
    };
    const moveMethodConfig = {
        events: [{ name: 'moveend', check: (map) => map.isMoving() }],
        getter: (map) => ({ center: map.getCenter() })
    };
    const zoomMethodConfig = {
        events: [{ name: 'zoomend', check: (map) => map.isZooming() }],
        getter: (map) => ({ zoom: map.getZoom() })
    };
    const rotateMethodConfig = {
        events: [{ name: 'rotateend', check: (map) => map.isRotating() }],
        getter: (map) => ({ bearing: map.getBearing() })
    };
    var methodsData = {
        setCenter: moveMethodConfig,
        panBy: moveMethodConfig,
        panTo: moveMethodConfig,
        setZoom: zoomMethodConfig,
        zoomTo: zoomMethodConfig,
        zoomIn: zoomMethodConfig,
        zoomOut: zoomMethodConfig,
        setBearing: rotateMethodConfig,
        rotateTo: rotateMethodConfig,
        resetNorth: rotateMethodConfig,
        snapToNorth: rotateMethodConfig,
        setPitch: {
            events: [{ name: 'pitchend', check: (map) => true }],
            getter: (map) => ({
                pitch: map.getPitch()
            })
        },
        fitBounds: {
            events: [
                { name: 'zoomend', check: (map) => map.isZooming() },
                { name: 'moveend', check: (map) => map.isMoving() },
                { name: 'rotateend', check: (map) => map.isRotating() }
            ],
            getter: (map) => ({
                zoom: map.getZoom(),
                bearing: map.getBearing(),
                pitch: map.getPitch(),
                center: map.getCenter()
            })
        },
        fitScreenCoordinates: {
            events: [
                { name: 'zoomend', check: (map, options) => map.isZooming() },
                { name: 'moveend', check: (map, options) => map.isMoving() },
                { name: 'rotateend', check: (map, options) => options.bearing && map.isRotating() }
            ],
            getter: (map) => ({
                zoom: map.getZoom(),
                center: map.getCenter(),
                bearing: map.getBearing(),
                pitch: map.getPitch()
            })
        },
        jumpTo: composedMethodConfig,
        easeTo: composedMethodConfig,
        flyTo: composedMethodConfig
    };

    function generateEventId(methodName) {
        return `${methodName}-${('' + Math.random()).split('.')[1]}`;
    }
    function catchEventFabric(map, eventName, eventId, resolve) {
        const catchEvent = (event) => {
            if (event.type !== eventName || event.eventId !== eventId) {
                return;
            }
            map.off(eventName, catchEvent);
            resolve(event);
        };
        return catchEvent;
    }
    function promisifyMethod(map, methodName) {
        const method = map[methodName];
        const argsCount = method.length;
        return (...args) => {
            const handlers = [];
            const eventData = { eventId: generateEventId(methodName) };
            // Creating list of events and event listeners
            const catchers = methodsData[methodName].events.map((event, index) => {
                return {
                    event,
                    func: new Promise((resolve, reject) => {
                        handlers[index] = { event, func: catchEventFabric(map, event.name, eventData.eventId, resolve) };
                        map.on(event.name, handlers[index].func);
                    })
                };
            });
            const argsArray = [];
            // Creating list of arguments.
            for (let i = 0; i < argsCount; i++) {
                if (i === argsCount - 1) {
                    // If args[i] is last argument, we assume that this is eventData argument,
                    // merge it with eventData passed by user and add in the end of list of arguments
                    argsArray.push({ ...eventData, ...(args[i] || {}) });
                }
                else {
                    // If args[i] is not last argument, just add it in the list of arguments
                    argsArray.push(args[i] || null);
                }
            }
            let funcs = [];
            let options = args[0] || {};
            try {
                method.apply(map, argsArray);
                // Filter catchers.
                // If map state is not changes (e.g. zoomTo(1) don't produce any events if map already on zoom 1),
                // just return resolved promise
                // .fitBounds() and .fitScreenCoordinates() needs special processing due to different number of arguments
                if (methodName === 'fitBounds') {
                    // args[0] is bounding box, options is args[1], but we don't need them to calculate events to listen
                    options = {};
                }
                if (methodName === 'fitScreenCoordinates') {
                    options = { bearing: null };
                    options.bearing = null;
                    // bearing can be passed by user as optional argument
                    if (typeof args[2] === 'number') {
                        options.bearing = args[2];
                    }
                    // pass bearing merged with other options
                    if (args[3] && typeof args[3] === 'object') {
                        options = {
                            ...options,
                            ...args[3]
                        };
                    }
                }
                funcs = catchers.map(({ event, func }) => {
                    if (event.check(map, options)) {
                        return func;
                    }
                    else {
                        map.off(event.name, func);
                        return Promise.resolve();
                    }
                });
            }
            catch (err) {
                handlers.forEach(({ event, func }) => {
                    map.off(event.name, func);
                });
                throw err;
            }
            return Promise.all(funcs).then(() => {
                return methodsData[methodName].getter(map);
            });
        };
    }

    function promisifyMap (map) {
        const toPromisify = Object.keys(methodsData);
        const actions = {};
        toPromisify.forEach((key) => {
            if (toPromisify.indexOf(key) !== -1) {
                actions[key] = promisifyMethod(map, key);
            }
        });
        return actions;
    }

    function promisify(map, methodName = null) {
        if (methodName) {
            return promisifyMethod(map, methodName);
        }
        else {
            return promisifyMap(map);
        }
    }

    return promisify;

})));
