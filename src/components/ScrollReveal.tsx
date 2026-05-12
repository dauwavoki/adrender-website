import type { ReactNode } from 'react'
import { useInViewReveal } from '../hooks/useInViewReveal'

type ScrollRevealProps = {
  children: ReactNode
  className?: string
}

export function ScrollReveal({ children, className = '' }: ScrollRevealProps) {
  const { ref, visible } = useInViewReveal<HTMLDivElement>()

  return (
    <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>
      {children}
    </div>
  )
}
