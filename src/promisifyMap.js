import promisifyMethod from './promisifyMethod'
import methodsData from './methodsData'

export default function (map) {
  const methodsNames = Object.keys(methodsData)
  Object.keys(map).forEach(key => {
    if (methodsNames.includes(key)) {
      map[key] = promisifyMethod(map, key)
    }
  })
  return map
}

