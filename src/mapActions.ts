interface IMapActions {
  setCenter(...args: any[]): Promise<any>,
  panBy(...args: any[]): Promise<any>,
  panTo(...args: any[]): Promise<any>,
  setZoom(...args: any[]): Promise<any>,
  zoomTo(...args: any[]): Promise<any>,
  zoomIn(...args: any[]): Promise<any>,
  zoomOut(...args: any[]): Promise<any>,
  setBearing(...args: any[]): Promise<any>,
  rotateTo(...args: any[]): Promise<any>,
  resetNorth(...args: any[]): Promise<any>,
  snapToNorth(...args: any[]): Promise<any>,
  setPitch(...args: any[]): Promise<any>,
  fitBounds(...args: any[]): Promise<any>,
  fitScreenCoordinates(...args: any[]): Promise<any>,
  jumpTo(...args: any[]): Promise<any>,
  easeTo(...args: any[]): Promise<any>,
  flyTo(...args: any[]): Promise<any>,
}

export default IMapActions
