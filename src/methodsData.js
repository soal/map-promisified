export default {
  setCenter: { events: ['moveend'], getter: map => ({ center: map.getCenter() })},
  panBy: { events: [], getter: map => ({}) }, // (offset, options, eventData)
  panTo: { events: [], getter: map => ({}) }, // (lnglat, options, eventData)
  setZoom: { events: [], getter: map => ({}) }, // (zoom, eventData)
  zoomTo: { events: [], getter: map => ({}) }, // (zoom, options, eventData)
  zoomIn: { events: ['zoomend'], getter: map => ({ zoom: map.getZoom() }) },
  zoomOut: { events: ['zoomend'], getter: map => ({ zoom: map.getZoom() }) },
  setBearing: { events: [], getter: map => ({}) }, // (bearing, eventData)
  rotateTo: { events: [], getter: map => ({}) }, // (bearing, options, eventData)
  resetNorth: { events: [], getter: map => ({}) }, // (options, eventData)
  snapToNorth: { events: [], getter: map => ({}) }, // (options, eventData)
  setPitch: { events: [], getter: map => ({}) }, // (pitch, eventData)
  fitBounds: { events: [], getter: map => ({}) }, // (bounds, options?, eventData?)
  fitScreenCoordinates: { events: [], getter: map => ({}) }, // (p0, p1, bearing, options, eventData)
  jumpTo: { events: [], getter: map => ({}) }, // (options, eventData)
  easeTo: { events: [], getter: map => ({}) }, // (options, eventData)
  flyTo: { events: [], getter: map => ({}) } // (options, eventData)
}


