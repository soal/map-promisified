import promisifyMap from './promisifyMap'
import promisifyMethod from './promisifyMethod'

export default function promisify (map, methodName = null) {
  if (methodName) {
    return promisifyMethod(map, methodName)
  } else {
    return promisifyMap(map)
  }
}
