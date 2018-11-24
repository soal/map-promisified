import methods from './methodsConfig'
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
    resolve(event)
  }
  return catchEvent
}

function promisifyMethod(map: Map, methodName: string): (...args: any) => Promise<object> {
  const method = map[methodName]
  const argsCount = method.length

  return (...args) => {
    const handlers = []
    const eventData = { eventId: generateEventId(methodName) }
    // Creating list of events and event listeners
    const catchers = methods[methodName].events.map((event, index) => {
      return {
        event,
        func: new Promise((resolve, reject) => {
          handlers[index] = { event, func: catchEventFabric(map, event.name, eventData.eventId, resolve) }
          map.on(event.name, handlers[index].func)
        })
      }
    })

    const argsArray = []
    // Creating list of arguments.
    for (let i = 0; i < argsCount; i++) {
      if (i === argsCount - 1) {
        // If args[i] is last argument, we assume that this is eventData argument,
        // merge it with eventData passed by user and add in the end of list of arguments
        argsArray.push({ ...eventData, ...(args[i] || {}) })
      } else {
        // If args[i] is not last argument, just add it in the list of arguments
        argsArray.push(args[i] || null)
      }
    }

    let funcs = []
    let options = args[0] || {}
    try {
      method.apply(map, argsArray)
      // Filter catchers.
      // If map state is not changes (e.g. zoomTo(1) don't produce any events if map already on zoom 1),
      // just return resolved promise

      // .fitBounds() and .fitScreenCoordinates() needs special processing due to different number of arguments
      if (methodName === 'fitBounds') {
        // args[0] is bounding box, options is args[1], but we don't need them to calculate events to listen
        options = {}
      }

      if (methodName === 'fitScreenCoordinates') {
        options = { bearing: null }
        options.bearing = null
        // bearing can be passed by user as optional argument
        if (typeof args[2] === 'number') {
          options.bearing = args[2]
        }
        // pass bearing merged with other options
        if (args[3] && typeof args[3] === 'object') {
          options = {
            ...options,
            ...args[3]
          }
        }
      }

      funcs = catchers.map(({ event, func }) => {
        if (event.check(map, options)) {
          return func
        } else {
          map.off(event.name, func)
          return Promise.resolve()
        }
      })
    } catch (err) {
      handlers.forEach(({ event, func }) => {
        map.off(event.name, func)
      })
      throw err
    }

    return Promise.all(funcs).then(() => {
      return methods[methodName].getter(map)
    })
  }
}

export default promisifyMethod
