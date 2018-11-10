import { Map } from 'mapbox-gl'

export default {
  setCenter: {
    events: [{ name: 'moveend', check: (map: Map): boolean => map.isMoving() }],
    getter: (map: Map): object => ({ center: map.getCenter() })
  },
  panBy: {
    events: [{ name: 'moveend', check: (map: Map): boolean => map.isMoving() }],
    getter: (map: Map): object => ({ center: map.getCenter()})
  },
  panTo: {
    events: [{ name: 'moveend', check: (map: Map): boolean => map.isMoving() }],
    getter: (map: Map): object => ({
      center: map.getCenter()
    })
  },
  setZoom: {
    events: [{ name: 'zoomend', check: (map: Map): boolean => map.isZooming() }],
    getter: (map: Map): object => ({ zoom: map.getZoom()})
  },
  zoomTo: {
    events: [{ name: 'zoomend', check: (map: Map): boolean => map.isZooming() }],
    getter: (map: Map): object => ({ zoom: map.getZoom() })
  },
  zoomIn: {
    events: [{ name: 'zoomend', check: (map: Map): boolean => map.isZooming() }],
    getter: (map: Map): object => ({ zoom: map.getZoom() })
   },
  zoomOut: {
    events: [{ name: 'zoomend', check: (map: Map): boolean => map.isZooming() }],
    getter: (map: Map): object => ({ zoom: map.getZoom() })
  },
  setBearing: {
    events: [{ name: 'rotateend', check: (map: Map): boolean => map.isRotating() }],
    getter: (map: Map): object => ({ bearing: map.getBearing() })
  },
  rotateTo: {
    events: [{ name: 'rotateend', check: (map: Map): boolean => map.isRotating() }],
    getter: (map: Map): object => ({ bearing: map.getBearing()}),
    check: (map: Map): boolean => true
  },
  resetNorth: {
    events: [{ name: 'rotateend', check: (map: Map): boolean => map.isRotating() }],
    getter: (map: Map): object => ({ bearing: map.getBearing() }),
    check: (map: Map): boolean => true
  },
  snapToNorth: {
    events: [{ name: 'rotateend', check: (map: Map): boolean => map.isRotating() }],
    getter: (map: Map): object => ({
      bearing: map.getBearing()
    })
  },
  setPitch: {
    events: [{ name: 'pitchend', check: (map: Map): boolean => true }],
    getter: (map: Map): object => ({
      pitch: map.getPitch()
    })
  }, // (pitch, eventData)
  fitBounds: {
    events: [{ name: '', check: (map: Map): boolean => true }],
    getter: (map: Map): object => ({

    })
   }, // (bounds, options?, eventData?)
  fitScreenCoordinates: {
    events: [{ name: '', check: (map: Map): boolean => true }],
    getter: (map: Map): object => ({

    })
  }, // (p0, p1, bearing, options, eventData)
  jumpTo: {
    events: [
      { name: 'moveend', check: (map: Map): boolean => map.isMoving() },
      { name: 'zoomend', check: (map: Map): boolean => map.isZooming() },
      { name: 'rotateend', check: (map: Map): boolean => map.isRotating() },
      { name: 'pitchend', check: (map: Map): boolean => map.isMoving() }
    ],
    getter: (map: Map): object => ({
      center: map.getCenter(),
      zoom: map.getZoom(),
      bearing: map.getBearing(),
      pitch: map.getPitch()
    })
  },
  easeTo: {
    events: [
      { name: 'moveend', check: (map: Map): boolean => map.isMoving() },
      { name: 'zoomend', check: (map: Map): boolean => map.isZooming() },
      { name: 'rotateend', check: (map: Map): boolean => map.isRotating() },
      { name: 'pitchend', check: (map: Map): boolean => map.isMoving() }
    ],
    getter: (map: Map): object => ({
      center: map.getCenter(),
      zoom: map.getZoom(),
      bearing: map.getBearing(),
      pitch: map.getPitch()
    })
  },
  flyTo: {
    events: [
      { name: 'moveend', check: (map: Map): boolean => map.isMoving() },
      { name: 'zoomend', check: (map: Map): boolean => map.isZooming() },
      { name: 'rotateend', check: (map: Map): boolean => map.isRotating() },
      { name: 'pitchend', check: (map: Map): boolean => map.isMoving() }
    ],
    getter: (map: Map): object => ({
      center: map.getCenter(),
      zoom: map.getZoom(),
      bearing: map.getBearing(),
      pitch: map.getPitch()
    })
  }
}
