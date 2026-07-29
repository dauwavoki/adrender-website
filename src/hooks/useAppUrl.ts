import { useEffect, useState } from 'react'
import { APP_BASE, getAppUrl } from '../lib/appUrl'

/**
 * Hydration-safe app deep link. Initial render always uses APP_BASE (matches SSG HTML);
 * after mount, forwards `?ref=` when present on the current page.
 */
export function useAppUrl(path = ''): string {
  const [url, setUrl] = useState(APP_BASE)

  useEffect(() => {
    setUrl(getAppUrl(path))
  }, [path])

  return url
}
