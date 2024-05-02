import { useState, useEffect, Children } from 'react'
import { NAVIGATION_EVENTS } from '../constants/constants.js'

import { getCurrentPath } from '../utils/getCurrentPath.js'

import { match } from 'path-to-regexp'

export function Router ({ children, routes = [], defaultComponent: DefaultComponent = () => null }) {
  const [currentPath, setPath] = useState(getCurrentPath())

  const routeParams = {}
  console.log(currentPath)
  const childrenRoutes = Children.map(children, ({ props, type }) => {
    const { name } = type

    if (name !== 'Route') return null

    return props
  })
  console.log(childrenRoutes)

  const routesToUse = [...routes, ...childrenRoutes]
  console.log(routesToUse)
  const Component = routesToUse.find(({ path }) => {
    console.log(path, currentPath)
    if (path === currentPath) return true
    const matchPath = match(path, { decode: decodeURIComponent })

    if (matchPath(currentPath)) {
      console.log(matchPath(currentPath))
      routeParams.params = matchPath(currentPath).params
      return true
    }

    return false
  })?.Component

  useEffect(() => {
    const handlePathChange = () => {
      setPath(getCurrentPath())
    }

    window.addEventListener(NAVIGATION_EVENTS.PUSH_STATE, handlePathChange)
    window.addEventListener(NAVIGATION_EVENTS.POP_STATE, handlePathChange)

    return () => {
      window.removeEventListener(NAVIGATION_EVENTS.PUSH_STATE, handlePathChange)
      window.removeEventListener(NAVIGATION_EVENTS.POP_STATE, handlePathChange)
    }
  }, [])

  return (
    <>
      {
        Component ? <Component routeParams={routeParams} /> : <DefaultComponent routeParams={routeParams} />
      }
    </>
  )
}
