import { NAVIGATION_EVENTS } from '../constants/constants.js'

export const navigate = (href) => {
  window.history.pushState({}, '', href)
  const pushStateEvent = new Event(NAVIGATION_EVENTS.PUSH_STATE)
  window.dispatchEvent(pushStateEvent)
}

export function Link ({ to, target, ...props }) {
  const handleClick = (event) => {
    const isMainEvent = event.button === 0
    const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
    const isManageableEvent = target === undefined || target === '_self'

    if (isMainEvent && !isModifiedEvent && isManageableEvent) {
      event.preventDefault()
      navigate(to)
    }
  }

  return <a onClick={handleClick} href={to} target={target} {...props} />
}
