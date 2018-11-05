import methods from './methodsData'
import { Map, MapboxEvent } from 'mapbox-gl'

type Event = { eventId: string } & MapboxEvent

function generateEventId(methodName: string): string {
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

function promisifyMethod(map: Map, methodName: string): (...args: any) => Promise<object> {
  const method = map[methodName]
  const argsCount = method.length

  return async (...args) => {
    const handlers = []
    const eventData = { eventId: generateEventId(methodName) }
    const funcs = methods[methodName].events.map((event, index) => {
      return new Promise((resolve, reject) => {
        handlers[index] = { event, func: catchEventFabric(map, event, eventData.eventId, resolve) }
        map.on(event, handlers[index])
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

    try {
      method.apply(map, argsArray)
    } catch (err) {
      handlers.forEach(({ event, func }) => {
        map.off(event, func)
      })
      throw err
    }

    return Promise.all(funcs).then(() => {
      return methods[methodName].getter(map)
    })
  }
}

export default promisifyMethod
