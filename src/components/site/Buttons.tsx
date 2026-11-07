import type { ReactNode } from 'react'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { cx } from './cx'

type LinkProps = {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
}

function isExternal(href: string) {
  return /^https?:\/\//.test(href)
}

export function PrimaryLink({
  href,
  children,
  className,
  onClick,
  arrow = true,
  size,
}: LinkProps & { arrow?: boolean; size?: 'header' | 'sm' }) {
  const classNames = cx(
    'site-btn site-btn-primary',
    arrow && 'has-arrow',
    size === 'header' && 'site-btn-header',
    size === 'sm' && 'site-btn-sm',
    className,
  )
  const inner = (
    <>
      {arrow ? (
        <span className="site-btn-dot" aria-hidden>
          <ArrowRight size={size === 'header' ? 14 : 16} />
        </span>
      ) : null}
      {children}
    </>
  )
  if (isExternal(href)) {
    return (
      <a href={href} className={classNames} onClick={onClick}>
        {inner}
      </a>
    )
  }
  if (href.startsWith('/#') || href.startsWith('#')) {
    return (
      <a href={href} className={classNames} onClick={onClick}>
        {inner}
      </a>
    )
  }
  return (
    <Link to={href} className={classNames} onClick={onClick}>
      {inner}
    </Link>
  )
}

export function SecondaryLink({ href, children, className, onClick }: LinkProps) {
  const classNames = cx('site-btn site-btn-secondary', className)
  if (isExternal(href) || href.startsWith('/#') || href.startsWith('#')) {
    return (
      <a href={href} className={classNames} onClick={onClick}>
        {children}
      </a>
    )
  }
  return (
    <Link to={href} className={classNames} onClick={onClick}>
      {children}
    </Link>
  )
}

export function TextLink({
  href,
  children,
  className,
  onClick,
  direction = 'deeper',
  newTab = false,
}: LinkProps & { direction?: 'deeper' | 'away'; newTab?: boolean }) {
  const Icon = direction === 'away' || newTab ? ArrowUpRight : ArrowRight
  const classNames = cx('site-text-link', className)
  const inner = (
    <>
      {children}
      <Icon size={16} aria-hidden />
    </>
  )
  if (isExternal(href) || newTab) {
    return (
      <a href={href} className={classNames} onClick={onClick} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    )
  }
  if (href.startsWith('/#') || href.startsWith('#')) {
    return (
      <a href={href} className={classNames} onClick={onClick}>
        {inner}
      </a>
    )
  }
  return (
    <Link to={href} className={classNames} onClick={onClick}>
      {inner}
    </Link>
  )
}
