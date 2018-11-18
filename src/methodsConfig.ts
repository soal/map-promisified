import { Map, FlyToOptions, FitBoundsOptions } from 'mapbox-gl'

const composedMethodEvents = [
  { name: 'moveend', check: (map: Map, options: FlyToOptions): boolean =>
    options.center && map.isMoving()
  },
  { name: 'zoomend', check: (map: Map, options: FlyToOptions): boolean =>
    options.zoom !== undefined && options.zoom !== null && map.isZooming()
  },
  { name: 'rotateend', check: (map: Map, options: FlyToOptions): boolean =>
    options.bearing !== undefined && options.bearing !== null && map.isRotating()
  },
  { name: 'pitchend', check: (map: Map, options: FlyToOptions): boolean =>
    options.pitch !== undefined && options.bearing !== null && map.isMoving()
  }
]

const composedMethodGetter = (map: Map): object => ({
  center: map.getCenter(),
  zoom: map.getZoom(),
  bearing: map.getBearing(),
  pitch: map.getPitch()
})

const composedMethodConfig = {
  events: composedMethodEvents,
  getter: composedMethodGetter
}

const moveMethodConfig = {
  events: [{ name: 'moveend', check: (map: Map): boolean => map.isMoving() }],
  getter: (map: Map): object => ({ center: map.getCenter() })
}

const zoomMethodConfig = {
  events: [{ name: 'zoomend', check: (map: Map): boolean => map.isZooming() }],
  getter: (map: Map): object => ({ zoom: map.getZoom()})
}

const rotateMethodConfig = {
  events: [{ name: 'rotateend', check: (map: Map): boolean => map.isRotating() }],
  getter: (map: Map): object => ({ bearing: map.getBearing() })
}

export default {
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
    events: [{ name: 'pitchend', check: (map: Map): boolean => true }],
    getter: (map: Map): object => ({
      pitch: map.getPitch()
    })
  },
  fitBounds: {
    events: [
      { name: 'zoomend', check: (map: Map): boolean => map.isZooming() },
      { name: 'moveend', check: (map: Map): boolean => map.isMoving() },
      { name: 'rotateend', check: (map: Map): boolean => map.isRotating() }
    ],
    getter: (map: Map): object => ({
      zoom: map.getZoom(),
      bearing: map.getBearing(),
      pitch: map.getPitch(),
      center: map.getCenter()
    })
  },
  fitScreenCoordinates: {
    events: [
      { name: 'zoomend', check: (map: Map, options): boolean => map.isZooming() },
      { name: 'moveend', check: (map: Map, options): boolean => map.isMoving() },
      { name: 'rotateend', check: (map: Map, options): boolean => options.bearing && map.isRotating() }
    ],
    getter: (map: Map): object => ({
      zoom: map.getZoom(),
      center: map.getCenter(),
      bearing: map.getBearing(),
      pitch: map.getPitch()
    })
  },
  jumpTo: composedMethodConfig,
  easeTo: composedMethodConfig,
  flyTo: composedMethodConfig
}
