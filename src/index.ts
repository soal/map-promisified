import promisifyMap from './promisifyMap'
import promisifyMethod from './promisifyMethod'
import { Map } from 'mapbox-gl'

export default function promisify(
  map: Map,
  methodName: string = null
): ((...args: any) => Promise<object>) | Map {
  if (methodName) {
    return promisifyMethod(map, methodName)
  } else {
    return promisifyMap(map)
  }
}
