import methods from './methodsData'

function generateEventId (methodName) {
  return `${methodName}-${('' + Math.random()).split('.')[1]}`
}

function catchEventFabric (map, eventName, eventId, resolve) {
  const catchEvent = event => {
    if (event.type !== eventName || event.eventId !== eventId) return
    map.off(eventName, catchEvent)
    return resolve(event)
  }
  return catchEvent
}

export function promisifyMethod (map, methodName) {
  const method = map[methodName]
  const argsCount = method.length

  return (...args) => {
    const eventData = { eventId: generateEventId(methodName) }
    const funcs = methods[methodName].events.map(event => {
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
