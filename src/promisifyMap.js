import promisifyMethod from './promisifyMethod'
import methodsData from './methodsData'

export default function (map) {
  const toPromisify = Object.keys(methodsData)
  Object.keys(map).forEach(key => {
    if (toPromisify.includes(key)) {
      map[key] = promisifyMethod(map, key)
    }
  })
  return map
}

