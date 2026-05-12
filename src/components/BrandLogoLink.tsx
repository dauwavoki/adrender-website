import { Link } from 'react-router-dom'

type BrandLogoLinkProps = {
  variant: 'nav' | 'footer'
}

export function BrandLogoLink({ variant }: BrandLogoLinkProps) {
  const isNav = variant === 'nav'

  return (
    <Link
      to="/"
      className="inline-flex shrink-0 items-center gap-2.5 font-heading font-semibold tracking-tight text-white"
    >
      <img
        src="/WebApp_Main_Logo.png"
        alt=""
        aria-hidden
        className={`w-auto ${isNav ? 'h-[36px] nav-logo-glow' : 'h-[30px]'}`}
      />
      <span className={isNav ? 'text-[20px] leading-none' : 'text-[17px] leading-none'}>AdRender</span>
    </Link>
  )
}
