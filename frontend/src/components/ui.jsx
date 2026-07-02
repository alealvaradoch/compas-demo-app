import { useEffect, useId, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useAnimate,
  useDragControls,
  useMotionValue,
} from 'motion/react'
import useMeasure from 'react-use-measure'
import {
  CaretDown,
  CheckCircle,
  DotsThree,
  MagnifyingGlass,
  X,
} from '@phosphor-icons/react'
import { cn } from '../lib/utils'
import { useOutsideClick } from '../hooks/useOutsideClick'

const fastSpring = { type: 'spring', stiffness: 420, damping: 34, mass: 0.8 }
const softTransition = { duration: 0.18, ease: 'easeOut' }

const statusStyles = {
  Activo: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  Pendiente: 'bg-amber-50 text-amber-800 ring-amber-100',
  Pausado: 'bg-neutral-100 text-neutral-600 ring-neutral-200',
  Confirmado: 'bg-blue-50 text-blue-700 ring-blue-100',
  'En espera': 'bg-amber-50 text-amber-800 ring-amber-100',
  'En curso': 'bg-primary-50 text-primary-700 ring-primary-100',
  Completado: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  Reagendar: 'bg-rose-50 text-rose-700 ring-rose-100',
  Pagado: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
}

const avatarTones = {
  orange: 'bg-primary-100 text-primary-700',
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-emerald-100 text-emerald-700',
  gray: 'bg-neutral-200 text-neutral-700',
  rose: 'bg-rose-100 text-rose-700',
  amber: 'bg-amber-100 text-amber-800',
}

export function AuroraBackground({ children, className, showRadialGradient = true }) {
  return (
    <main
      className={cn(
        'relative flex min-h-svh overflow-hidden bg-[linear-gradient(135deg,#fff7ed_0%,#f7f8ff_36%,#eef2ff_66%,#fff3dc_100%)] text-ink',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[14%] bg-[radial-gradient(circle_at_82%_10%,rgb(6_24_90/0.42),transparent_34%),radial-gradient(circle_at_88%_38%,rgb(11_43_111/0.28),transparent_32%),radial-gradient(circle_at_6%_74%,rgb(246_161_26/0.32),transparent_38%),radial-gradient(circle_at_52%_46%,rgb(255_247_237/0.72),transparent_36%),radial-gradient(circle_at_18%_100%,rgb(6_24_90/0.18),transparent_36%)] blur-[14px]" />
        <div
          className={cn(
            'aurora-field absolute -inset-[22%] opacity-70 blur-3xl saturate-[1.45] will-change-transform after:absolute after:inset-0 after:animate-aurora after:bg-[inherit] after:bg-fixed after:opacity-70 after:mix-blend-soft-light after:content-[""]',
            showRadialGradient &&
              '[mask-image:radial-gradient(ellipse_at_58%_8%,black_4%,transparent_70%)]',
          )}
        />
        <div className="noise-texture absolute inset-0 opacity-[0.035]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(255_255_255/0.06),rgb(255_255_255/0.18)_52%,rgb(255_255_255/0.30))]" />
        <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
      </div>
      <div className="relative z-10 flex w-full">{children}</div>
    </main>
  )
}

export function AppShell({
  activePage,
  children,
  industrySelector,
  navItems,
  onNavigate,
  userMenu,
}) {
  return (
    <div className="min-h-svh bg-soft text-ink">
      <DesktopSidebar
        activePage={activePage}
        industrySelector={industrySelector}
        navItems={navItems}
        onNavigate={onNavigate}
        userMenu={userMenu}
      />

      <main className="min-h-svh lg:pl-[280px]">
        <header className="sticky top-0 z-30 border-b border-line/80 bg-white/78 backdrop-blur-xl lg:hidden">
          <div className="flex min-h-16 items-center gap-3 px-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-ink text-sm font-semibold text-white shadow-soft">
              C
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink">Compás</p>
              <p className="truncate text-xs text-muted">Operación</p>
            </div>
            <div className="min-w-34 max-w-40">{industrySelector}</div>
            {userMenu}
          </div>
        </header>

        <div className="mx-auto w-full max-w-[1180px] px-4 pb-28 pt-4 lg:px-8 lg:pb-10 lg:pt-7">
          {children}
        </div>
      </main>

      <MobileBottomNav
        activePage={activePage}
        items={navItems.slice(0, 5)}
        onNavigate={onNavigate}
      />
    </div>
  )
}

export function DesktopSidebar({
  activePage,
  industrySelector,
  navItems,
  onNavigate,
  userMenu,
}) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[280px] border-r border-white/80 bg-white/72 p-4 shadow-soft backdrop-blur-2xl lg:flex lg:flex-col">
      <div className="mb-6 flex items-center gap-3 px-2">
        <div className="flex size-11 items-center justify-center rounded-lg bg-ink text-base font-semibold text-white shadow-soft">
          C
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">Compás Demo</p>
          <p className="text-xs text-muted">Apps operativas</p>
        </div>
      </div>

      <div className="mb-5 px-2">{industrySelector}</div>

      <Navigation activePage={activePage} items={navItems} onNavigate={onNavigate} />

      <div className="mt-auto space-y-4 px-2">
        <Divider />
        <div className="flex items-center gap-3">
          <Avatar initials="CO" tone="orange" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink">Equipo Compás</p>
            <p className="truncate text-xs text-muted">Demo comercial</p>
          </div>
          {userMenu}
        </div>
      </div>
    </aside>
  )
}

export function MobileBottomNav({ activePage, items, onNavigate }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/80 bg-white/88 px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-16px_40px_rgb(26_29_36/0.08)] backdrop-blur-2xl lg:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-5 gap-1">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activePage === item.key || item.aliases?.includes(activePage)

          return (
            <button
              className="relative flex min-h-12 flex-col items-center justify-center gap-1 rounded-lg px-1 text-xs text-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500/30"
              key={item.key}
              onClick={() => onNavigate(item.key)}
              type="button"
            >
              {isActive && (
                <motion.span
                  className="absolute inset-1 rounded-lg bg-primary-50"
                  layoutId="mobile-nav-active"
                  transition={fastSpring}
                />
              )}
              <Icon
                className={cn('relative z-10 size-5', isActive && 'text-primary-600')}
                weight={isActive ? 'bold' : 'regular'}
              />
              <span
                className={cn(
                  'relative z-10 max-w-full truncate text-[11px]',
                  isActive && 'font-medium text-primary-700',
                )}
              >
                {item.shortLabel ?? item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export function Navigation({ activePage, className, items, onNavigate }) {
  return (
    <nav className={cn('space-y-1', className)}>
      {items.map((item) => {
        const Icon = item.icon
        const isActive = activePage === item.key || item.aliases?.includes(activePage)

        return (
          <button
            className={cn(
              'group relative flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-sm text-muted transition-colors hover:bg-white/82 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500/30',
              isActive && 'bg-white text-ink shadow-card',
            )}
            key={item.key}
            onClick={() => onNavigate(item.key)}
            type="button"
          >
            {isActive && (
              <motion.span
                className="absolute left-0 top-2 h-7 w-1 rounded-full bg-primary-500"
                layoutId="desktop-nav-active"
                transition={fastSpring}
              />
            )}
            <Icon
              className={cn('size-5 shrink-0', isActive && 'text-primary-600')}
              weight={isActive ? 'bold' : 'regular'}
            />
            <span className="min-w-0 flex-1 truncate">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

export function PageHeader({
  actions,
  description,
  eyebrow,
  leading,
  title,
}) {
  return (
    <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        {leading}
        <div className="min-w-0">
          {eyebrow && (
            <p className="mb-1 text-xs font-medium uppercase text-primary-700">{eyebrow}</p>
          )}
          <h1 className="truncate text-3xl font-semibold leading-tight text-ink">{title}</h1>
          {description && (
            <p className="mt-1 max-w-2xl text-sm leading-6 text-muted">{description}</p>
          )}
        </div>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}

export function SectionHeader({ action, eyebrow, title }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <div className="min-w-0">
        {eyebrow && <p className="text-xs font-medium text-primary-700">{eyebrow}</p>}
        <h2 className="truncate text-base font-semibold text-ink">{title}</h2>
      </div>
      {action}
    </div>
  )
}

export function Card({ children, className, interactive = false, onClick }) {
  const Component = onClick ? motion.button : motion.div

  return (
    <Component
      className={cn(
        'glass-surface min-w-0 rounded-lg p-4 text-left',
        interactive && 'transition-shadow hover:shadow-soft',
        onClick && 'w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500/30',
        className,
      )}
      onClick={onClick}
      transition={softTransition}
      type={onClick ? 'button' : undefined}
      whileHover={interactive ? { y: -2 } : undefined}
      whileTap={onClick ? { scale: 0.99 } : undefined}
    >
      {children}
    </Component>
  )
}

export function StatCard({ accent = 'primary', icon: Icon, label, trend, value }) {
  const accentClass = {
    primary: 'bg-primary-50 text-primary-700',
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-800',
  }[accent]

  return (
    <Card className="min-h-28 p-4" interactive>
      <div className="flex items-start justify-between gap-3">
        <div className={cn('flex size-10 items-center justify-center rounded-lg', accentClass)}>
          {Icon && <Icon className="size-5" weight="regular" />}
        </div>
        {trend && <Badge variant={trend.includes('-') ? 'danger' : 'success'}>{trend}</Badge>}
      </div>
      <p className="mt-4 text-2xl font-semibold leading-none text-ink">{value}</p>
      <p className="mt-2 text-sm text-muted">{label}</p>
    </Card>
  )
}

export function Button({
  children,
  className,
  icon: Icon,
  iconPosition = 'left',
  size = 'md',
  variant = 'primary',
  ...props
}) {
  const sizes = {
    sm: 'min-h-9 px-3 text-sm',
    md: 'min-h-10 px-4 text-sm',
    lg: 'min-h-12 px-5 text-base',
  }

  const variants = {
    primary:
      'bg-primary-500 text-white shadow-[0_10px_24px_rgb(255_106_0/0.24)] hover:bg-primary-600',
    secondary:
      'border border-line bg-white/82 text-ink shadow-card hover:bg-white',
    ghost: 'text-muted hover:bg-white/72 hover:text-ink',
    danger: 'bg-rose-500 text-white shadow-[0_10px_24px_rgb(244_63_94/0.18)] hover:bg-rose-600',
  }

  return (
    <motion.button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500/30 disabled:opacity-55',
        sizes[size],
        variants[variant],
        className,
      )}
      transition={softTransition}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="size-[18px]" weight="regular" />}
      <span className="truncate">{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="size-[18px]" weight="regular" />}
    </motion.button>
  )
}

export function IconButton({ 'aria-label': ariaLabel, children, className, icon: Icon, tooltip, ...props }) {
  const button = (
    <motion.button
      aria-label={ariaLabel}
      className={cn(
        'inline-flex size-10 items-center justify-center rounded-full border border-line bg-white/82 text-muted shadow-card transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500/30 disabled:opacity-55',
        className,
      )}
      transition={softTransition}
      type="button"
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.96 }}
      {...props}
    >
      {Icon ? <Icon className="size-5" weight="regular" /> : children}
    </motion.button>
  )

  return tooltip ? <Tooltip content={tooltip}>{button}</Tooltip> : button
}

export function Badge({ children, className, variant = 'neutral' }) {
  const variants = {
    neutral: 'bg-neutral-100 text-neutral-700 ring-neutral-200',
    primary: 'bg-primary-50 text-primary-700 ring-primary-100',
    success: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
    warning: 'bg-amber-50 text-amber-800 ring-amber-100',
    danger: 'bg-rose-50 text-rose-700 ring-rose-100',
    info: 'bg-blue-50 text-blue-700 ring-blue-100',
  }

  return (
    <span
      className={cn(
        'inline-flex max-w-full items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1',
        variants[variant],
        statusStyles[children],
        className,
      )}
    >
      <span className="truncate">{children}</span>
    </span>
  )
}

export function Chip({ active = false, children, className, onClick }) {
  const Component = onClick ? 'button' : 'span'

  return (
    <Component
      className={cn(
        'inline-flex min-h-8 items-center rounded-full border px-3 text-sm font-medium transition-colors',
        active
          ? 'border-primary-200 bg-primary-50 text-primary-700'
          : 'border-line bg-white/72 text-muted hover:bg-white hover:text-ink',
        className,
      )}
      onClick={onClick}
      type={onClick ? 'button' : undefined}
    >
      <span className="truncate">{children}</span>
    </Component>
  )
}

export function Input({ className, icon: Icon, label, ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>}
      <span className="relative block">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
        )}
        <input
          className={cn(
            'min-h-11 w-full rounded-lg border border-line bg-white/78 px-3 text-sm text-ink shadow-sm outline-none transition-[border-color,box-shadow,background] placeholder:text-neutral-400 focus:border-primary-500/70 focus:bg-white focus:shadow-[0_0_0_4px_rgb(255_106_0/0.12)]',
            Icon && 'pl-9',
            className,
          )}
          {...props}
        />
      </span>
    </label>
  )
}

export function SearchInput({
  className,
  onChange,
  placeholder = 'Buscar',
  value,
  ...props
}) {
  const [focused, setFocused] = useState(false)

  return (
    <motion.label
      animate={{ width: focused || value ? 320 : 248 }}
      className={cn('relative block max-w-full', className)}
      transition={fastSpring}
    >
      <span className="sr-only">{placeholder}</span>
      <MagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
      <input
        className="min-h-11 w-full rounded-full border border-white/80 bg-white/80 pl-9 pr-4 text-sm text-ink shadow-card outline-none backdrop-blur-xl transition-[border-color,box-shadow,background] placeholder:text-neutral-400 focus:border-primary-500/70 focus:bg-white focus:shadow-[0_0_0_4px_rgb(255_106_0/0.12)]"
        onBlur={() => setFocused(false)}
        onChange={(event) => onChange?.(event.target.value)}
        onFocus={() => setFocused(true)}
        placeholder={placeholder}
        type="search"
        value={value}
        {...props}
      />
    </motion.label>
  )
}

export function Select({ className, label, options, ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>}
      <span className="relative block">
        <select
          className={cn(
            'min-h-10 w-full appearance-none rounded-full border border-line bg-white/82 py-0 pl-3 pr-9 text-sm font-medium text-ink shadow-card outline-none transition-[border-color,box-shadow,background] focus:border-primary-500/70 focus:bg-white focus:shadow-[0_0_0_4px_rgb(255_106_0/0.12)]',
            className,
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <CaretDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
      </span>
    </label>
  )
}

export function Textarea({ className, label, ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>}
      <textarea
        className={cn(
          'min-h-28 w-full resize-none rounded-lg border border-line bg-white/78 px-3 py-3 text-sm text-ink shadow-sm outline-none transition-[border-color,box-shadow,background] placeholder:text-neutral-400 focus:border-primary-500/70 focus:bg-white focus:shadow-[0_0_0_4px_rgb(255_106_0/0.12)]',
          className,
        )}
        {...props}
      />
    </label>
  )
}

export function Modal({ children, description, onClose, open, title }) {
  useEffect(() => {
    if (!open) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-ink/24 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          onMouseDown={onClose}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="glass-surface w-full max-w-md rounded-xl p-4"
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            onMouseDown={(event) => event.stopPropagation()}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={softTransition}
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-ink">{title}</h2>
                {description && <p className="mt-1 text-sm text-muted">{description}</p>}
              </div>
              <IconButton aria-label="Cerrar modal" icon={X} onClick={onClose} />
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function BottomSheet({ children, onClose, open, title }) {
  const [scope, animate] = useAnimate()
  const [drawerRef, { height }] = useMeasure()
  const y = useMotionValue(0)
  const controls = useDragControls()

  useEffect(() => {
    if (!open) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, open])

  async function handleClose() {
    if (scope.current) {
      animate(scope.current, { opacity: [1, 0] }, { duration: 0.16 })
    }

    await animate('#bottom-sheet-panel', { y: [y.get() || 0, height || 460] }, { duration: 0.18 })
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-ink/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          ref={scope}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="absolute bottom-0 left-0 right-0 max-h-[78svh] overflow-hidden rounded-t-2xl border border-white/80 bg-white/92 shadow-[0_-18px_60px_rgb(26_29_36/0.16)] backdrop-blur-2xl"
            drag="y"
            dragConstraints={{ bottom: 0, top: 0 }}
            dragControls={controls}
            dragElastic={{ bottom: 0.35, top: 0 }}
            dragListener={false}
            id="bottom-sheet-panel"
            initial={{ y: '100%' }}
            onClick={(event) => event.stopPropagation()}
            onDragEnd={() => {
              if (y.get() >= 100) {
                handleClose()
              }
            }}
            ref={drawerRef}
            animate={{ y: 0 }}
            transition={{ ease: 'easeOut', duration: 0.2 }}
            style={{ y }}
          >
            <div className="sticky top-0 z-10 border-b border-line/80 bg-white/88 px-4 pb-3 pt-3 backdrop-blur-xl">
              <button
                aria-label="Arrastrar para cerrar"
                className="mx-auto mb-3 block h-1.5 w-12 cursor-grab touch-none rounded-full bg-neutral-300 active:cursor-grabbing"
                onPointerDown={(event) => controls.start(event)}
                type="button"
              />
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-base font-semibold text-ink">{title}</h2>
                <IconButton aria-label="Cerrar" icon={X} onClick={handleClose} />
              </div>
            </div>
            <ScrollArea className="max-h-[calc(78svh-76px)] p-4">{children}</ScrollArea>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function DropdownMenu({ align = 'right', items }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useOutsideClick(ref, () => setOpen(false))

  return (
    <div className="relative" ref={ref}>
      <IconButton
        aria-label="Abrir menú"
        className="shadow-none"
        icon={DotsThree}
        onClick={() => setOpen((current) => !current)}
      />
      <AnimatePresence>
        {open && (
          <motion.div
            className={cn(
              'absolute top-12 z-40 min-w-48 rounded-lg border border-line bg-white p-1 shadow-soft',
              align === 'right' ? 'right-0' : 'left-0',
            )}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={softTransition}
          >
            {items.map((item) => {
              const Icon = item.icon

              return (
                <button
                  className="flex min-h-10 w-full items-center gap-2 rounded-md px-3 text-left text-sm text-muted transition-colors hover:bg-soft hover:text-ink"
                  key={item.label}
                  onClick={() => {
                    item.onClick?.()
                    setOpen(false)
                  }}
                  type="button"
                >
                  {Icon && <Icon className="size-4" />}
                  <span>{item.label}</span>
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function EmptyState({ action, description, icon: Icon = CheckCircle, title }) {
  return (
    <div className="rounded-lg border border-dashed border-line bg-white/54 px-4 py-6 text-center">
      <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
        <Icon className="size-7" weight="light" />
      </div>
      <h3 className="mt-3 text-sm font-semibold text-ink">{title}</h3>
      {description && <p className="mx-auto mt-1 max-w-sm text-sm text-muted">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

export function Skeleton({ className }) {
  return <div className={cn('animate-pulse rounded-lg bg-neutral-200/80', className)} />
}

export function Toast({ message, onClose, open, title, variant = 'success' }) {
  const Icon = variant === 'success' ? CheckCircle : X

  useEffect(() => {
    if (!open) return undefined

    const timeout = window.setTimeout(onClose, 2800)
    return () => window.clearTimeout(timeout)
  }, [onClose, open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed bottom-24 right-4 z-50 flex w-[calc(100%-2rem)] max-w-sm items-start gap-3 rounded-lg border border-line bg-white p-3 shadow-soft lg:bottom-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={softTransition}
        >
          <div
            className={cn(
              'mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full',
              variant === 'success'
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-rose-50 text-rose-700',
            )}
          >
            <Icon className="size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-ink">{title}</p>
            <p className="mt-0.5 text-sm text-muted">{message}</p>
          </div>
          <IconButton aria-label="Cerrar aviso" className="size-8 shadow-none" icon={X} onClick={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Tabs({ onChange, tabs, value }) {
  const id = useId()

  return (
    <div className="scrollbar-none flex gap-1 overflow-x-auto rounded-full border border-line bg-white/62 p-1">
      {tabs.map((tab) => {
        const isActive = value === tab.value

        return (
          <button
            className={cn(
              'relative min-h-9 shrink-0 rounded-full px-3 text-sm font-medium text-muted transition-colors hover:text-ink',
              isActive && 'text-ink',
            )}
            key={tab.value}
            onClick={() => onChange(tab.value)}
            type="button"
          >
            {isActive && (
              <motion.span
                className="absolute inset-0 rounded-full bg-white shadow-card"
                layoutId={`tab-active-${id}`}
                transition={fastSpring}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export function Divider({ className }) {
  return <div className={cn('h-px w-full bg-line', className)} />
}

export function Tooltip({ children, content }) {
  return (
    <span className="group/tooltip relative inline-flex">
      {children}
      <span className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2 py-1 text-xs text-white opacity-0 shadow-soft transition-opacity group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100">
        {content}
      </span>
    </span>
  )
}

export function Avatar({ className, initials, tone = 'orange' }) {
  return (
    <span
      className={cn(
        'inline-flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold',
        avatarTones[tone] ?? avatarTones.orange,
        className,
      )}
    >
      {initials}
    </span>
  )
}

export function ScrollArea({ children, className }) {
  return (
    <div className={cn('scrollbar-none overflow-auto overscroll-contain', className)}>
      {children}
    </div>
  )
}
