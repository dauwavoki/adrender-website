import { useCallback, useState, type FocusEvent, type KeyboardEvent } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Shared open/close state for the header mega menus (Product, Solutions).
 * Opens on hover or keyboard focus; closes on mouse leave, focus leaving,
 * Escape, any link click inside, and any route or hash change.
 */
export function useMegaMenu() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Close on any route or hash change (state adjusted during render, per React docs).
  const routeKey = location.pathname + location.hash
  const [seenRoute, setSeenRoute] = useState(routeKey)
  if (seenRoute !== routeKey) {
    setSeenRoute(routeKey)
    setOpen(false)
  }

  const close = useCallback(() => {
    setOpen(false)
    // Drop focus from the clicked link so the panel can't stay open on focus.
    const active = document.activeElement
    if (active instanceof HTMLElement) active.blur()
  }, [])

  const containerProps = {
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onFocus: (event: FocusEvent<HTMLDivElement>) => {
      // Only open for keyboard focus, not the focus a mouse click leaves behind.
      if (event.target instanceof HTMLElement && event.target.matches(':focus-visible')) setOpen(true)
    },
    onBlur: (event: FocusEvent<HTMLDivElement>) => {
      const next = event.relatedTarget
      if (!(next instanceof Node) || !event.currentTarget.contains(next)) setOpen(false)
    },
    onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Escape') setOpen(false)
    },
  }

  return { open, setOpen, close, containerProps }
}
