export function Still({
  src,
  width,
  height,
  className,
}: {
  src: string
  width: number
  height: number
  className?: string
}) {
  return (
    <img
      className={className}
      src={src}
      alt=""
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  )
}
