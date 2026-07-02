import { cn } from '../../lib/utils'

export function GlassPanel({ children, className }) {
  return (
    <div
      className={cn(
        className,
        'relative overflow-hidden rounded-[32px] border border-white/45 bg-white/[0.08] shadow-[0_44px_140px_rgba(15,23,42,0.18),inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-[56px]',
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/35 via-white/10 to-white/5" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/45 to-transparent" />
      <div className="pointer-events-none absolute inset-0 rounded-[32px] ring-1 ring-white/35" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default GlassPanel
