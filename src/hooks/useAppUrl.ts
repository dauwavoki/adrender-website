import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { APP_BASE, getAppUrl } from '../lib/appUrl'

/**
 * Hydration-safe app deep link. Initial render always uses APP_BASE (matches SSG HTML);
 * after mount, forwards `?ref=` and marketing attribution (`src` / `utm_*`) from the
 * current page or sessionStorage. Recomputes on SPA navigations so persisted values
 * and path-based src defaults stay in sync.
 */
export function useAppUrl(path = ''): string {
  const [url, setUrl] = useState(APP_BASE)
  const location = useLocation()

  useEffect(() => {
    setUrl(getAppUrl(path))
  }, [path, location.pathname, location.search])

  return url
}
