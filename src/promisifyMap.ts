import promisifyMethod from './promisifyMethod'
import methodsData from './methodsData'
import { Map } from 'mapbox-gl'

type PromisifiedMap = {
} & Map

export default function (map: Map): PromisifiedMap {
  const toPromisify = Object.keys(methodsData)
  Object.keys(map).forEach((key: string) => {
    if (toPromisify.indexOf(key) !== -1) {
      map[key] = promisifyMethod(map, key)
    }
  })
  return map
}
