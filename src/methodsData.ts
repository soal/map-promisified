import { Map } from 'mapbox-gl'

export default {
  setCenter: { events: ['moveend'], getter: (map: Map): object => ({ center: map.getCenter() })},
  panBy: { events: [], getter: (map: Map): object => ({}) }, // (offset, options, eventData)
  panTo: { events: [], getter: (map: Map): object => ({}) }, // (lnglat, options, eventData)
  setZoom: { events: [], getter: (map: Map): object => ({}) }, // (zoom, eventData)
  zoomTo: { events: ['zoomend'], getter: (map: Map): object => ({ zoom: map.getZoom() }) },
  zoomIn: { events: ['zoomend'], getter: (map: Map): object => ({ zoom: map.getZoom() }) },
  zoomOut: { events: ['zoomend'], getter: (map: Map): object => ({ zoom: map.getZoom() }) },
  setBearing: { events: [], getter: (map: Map): object => ({}) }, // (bearing, eventData)
  rotateTo: { events: [], getter: (map: Map): object => ({}) }, // (bearing, options, eventData)
  resetNorth: { events: [], getter: (map: Map): object => ({}) }, // (options, eventData)
  snapToNorth: { events: [], getter: (map: Map): object => ({}) }, // (options, eventData)
  setPitch: { events: [], getter: (map: Map): object => ({}) }, // (pitch, eventData)
  fitBounds: { events: [], getter: (map: Map): object => ({}) }, // (bounds, options?, eventData?)
  fitScreenCoordinates: { events: [], getter: (map: Map): object => ({}) }, // (p0, p1, bearing, options, eventData)
  jumpTo: { events: [], getter: (map: Map): object => ({}) }, // (options, eventData)
  easeTo: { events: [], getter: (map: Map): object => ({}) }, // (options, eventData)
  flyTo: { events: [], getter: (map: Map): object => ({}) } // (options, eventData)
}


