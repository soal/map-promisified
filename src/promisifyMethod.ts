import methods from './methodsData'
import { Map, MapboxEvent } from 'mapbox-gl'

type Event = { eventId: string } & MapboxEvent

function generateEventId (methodName: string): string {
  return `${methodName}-${('' + Math.random()).split('.')[1]}`
}

function catchEventFabric(
  map: Map,
  eventName: string,
  eventId: string,
  resolve: (event) => void
): (event: any) => void {
  const catchEvent = (event: Event) => {
    if (event.type !== eventName || event.eventId !== eventId) {
      return
    }
    map.off(eventName, catchEvent)
    return resolve(event)
  }
  return catchEvent
}

function promisifyMethod(map: Map, methodName: string): (any) => Promise<object> {
  const method = map[methodName]
  const argsCount = method.length

  return (...args) => {
    const eventData = { eventId: generateEventId(methodName) }
    const funcs = methods[methodName].events.map((event) => {
      return new Promise((resolve, reject) => {
        map.on(event, catchEventFabric(map, event, eventData.eventId, resolve))
      })
    })

    const argsArray = []
    for (let i = 0; i < argsCount; i++) {
      if (i === argsCount - 1) {
        argsArray.push({ ...eventData, ...(args[i] || {}) })
      } else {
        argsArray.push(args[i] || null)
      }
    }
    method.apply(map, argsArray)

    return Promise.all(funcs).then(res => {
      return methods[methodName].getter(map)
    })
  }
}

export default promisifyMethod
