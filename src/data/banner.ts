/**
 * Top promo banner. Change the link or the last day it shows by editing this object.
 * `endsAt` is the last calendar day the banner is visible, through end of day in America/New_York.
 */
export const banner = {
  href: 'https://app.adrender.app/?ref=MARKEA7N',
  endsAt: '2026-12-30',
} as const

const BANNER_TIME_ZONE = 'America/New_York'

/** YYYY-MM-DD in America/New_York. */
export function bannerCalendarDate(now: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: BANNER_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now)
  const value = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? ''
  return `${value('year')}-${value('month')}-${value('day')}`
}

/** Visible through the end of `banner.endsAt` in America/New_York. Hidden from the next calendar day. */
export function isBannerActive(now: Date = new Date()): boolean {
  return bannerCalendarDate(now) <= banner.endsAt
}
