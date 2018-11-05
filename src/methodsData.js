"use strict";
exports.__esModule = true;
exports["default"] = {
    setCenter: { events: ['moveend'], getter: function (map) { return ({ center: map.getCenter() }); } },
    panBy: { events: [], getter: function (map) { return ({}); } },
    panTo: { events: [], getter: function (map) { return ({}); } },
    setZoom: { events: [], getter: function (map) { return ({}); } },
    zoomTo: { events: [], getter: function (map) { return ({}); } },
    zoomIn: { events: ['zoomend'], getter: function (map) { return ({ zoom: map.getZoom() }); } },
    zoomOut: { events: ['zoomend'], getter: function (map) { return ({ zoom: map.getZoom() }); } },
    setBearing: { events: [], getter: function (map) { return ({}); } },
    rotateTo: { events: [], getter: function (map) { return ({}); } },
    resetNorth: { events: [], getter: function (map) { return ({}); } },
    snapToNorth: { events: [], getter: function (map) { return ({}); } },
    setPitch: { events: [], getter: function (map) { return ({}); } },
    fitBounds: { events: [], getter: function (map) { return ({}); } },
    fitScreenCoordinates: { events: [], getter: function (map) { return ({}); } },
    jumpTo: { events: [], getter: function (map) { return ({}); } },
    easeTo: { events: [], getter: function (map) { return ({}); } },
    flyTo: { events: [], getter: function (map) { return ({}); } } // (options, eventData)
};
